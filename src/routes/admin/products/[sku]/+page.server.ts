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
					id: true
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
		{ ...product, sku: product.sku.toString(), category: product.categories[0].id, description: product.description || '' },
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
	update: async ({ request, params }) => {
		const sku = Number(params.sku);
		const form = await superValidate(request, productSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		await db.product.update({
			where: {
				sku
			},
			data: {
				name: form.data.name,
				price: form.data.price,
				description: form.data.description,
				categories: {
					set: [],
					connect: { id: Number(form.data.category) }
				}
			}
		});

		return message(form, 'Product Updated');
	},
	delete: async ({ params }) => {
		const sku = Number(params.sku);

		const deleteForm = await superValidate({ sku }, deleteProductSchema);

		if (!deleteForm.valid) {
			return message(deleteForm, 'Unable to delete product: SKU parameter is missing.', {
				status: 400
			});
		}

		try {
			const productToDelete = await db.product.findUniqueOrThrow({
				where: {
					sku: sku
				}
			});

			const cartItemsProduct = await db.cartItem.count({
				where: {
					productId: productToDelete.sku
				}
			});

			// delete all cart items and products if at least 1 user cart has this product.
			if (cartItemsProduct > 0) {
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
			return message(deleteForm, `Unable to delete product: ${error.message}`, {
				status: 400
			});
		}

		throw redirect(307, '/admin/products');
	}
};
