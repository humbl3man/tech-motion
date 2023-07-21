import { z } from 'zod';
import { db } from '$lib/db';
import { productSchema } from '$lib/validation/productSchema';
import { error, fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

const deleteProductSchema = z.object({
	sku: z.number()
});

export const load = async (event) => {
	const product = await db.product.findUnique({
		where: {
			sku: +event.params.sku
		},
		include: {
			categories: {
				select: {
					id: true,
					name: true
				}
			}
		}
	});

	if (!product) {
		throw error(404, 'Product Not Found');
	}

	const categories = await db.category.findMany({
		select: {
			id: true,
			name: true
		}
	});

	const updateForm = await superValidate(
		{ ...product, sku: product.sku.toString(), description: product.description || '' },
		productSchema
	);

	const deleteForm = await superValidate(deleteProductSchema);

	return {
		product,
		updateForm,
		deleteForm,
		categories
	};
};

export const actions = {
	update: async (event) => {
		const form = await superValidate(event, productSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		// TODO: update category if provided in the form

		await db.product.update({
			where: {
				sku: +form.data.sku
			},
			data: {
				name: form.data.name,
				price: form.data.price,
				description: form.data.description
			}
		});

		return message(form, 'Product Updated');
	},
	delete: async ({ request, params }) => {
		const deleteForm = await superValidate(
			{
				sku: +params.sku
			},
			deleteProductSchema
		);

		if (!deleteForm.valid) {
			return message(deleteForm, 'unable to delete', {
				status: 400
			});
		}

		const sku = +params.sku;

		try {
			const productToDelete = await db.product.findUniqueOrThrow({
				where: {
					sku: +params.sku
				}
			});

			const numberOfCartItemsReferencingProduct = await db.cartItem.count({
				where: {
					productId: productToDelete.sku
				}
			});

			// delete all cart items and products if at least 1 user cart has this product.
			if (numberOfCartItemsReferencingProduct > 0) {
				await db.cartItem.deleteMany({
					where: {
						productId: sku
					}
				});
			}

			await db.product.delete({
				where: {
					sku: sku
				}
			});
		} catch (error: any) {
			console.error(error.message);
			return message(deleteForm, 'unable to delete', {
				status: 400
			});
		}

		throw redirect(307, '/admin/products');
	}
};
