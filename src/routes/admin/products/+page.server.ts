import { db } from '$lib/db.js';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

import { message, superValidate } from 'sveltekit-superforms/server';
import { placeholderProductImage } from '$lib/constants/image';
import { productSchema } from '$lib/validation/productSchema';

const deleteProductSchema = z.object({
	sku: z.string()
});

export const load = async (event) => {
	console.log('running load');
	// get list of products
	const allProducts = await db.product.findMany({
		select: {
			name: true,
			price: true,
			sku: true,
			categories: true
		},
		orderBy: {
			sku: 'asc'
		}
	});

	const categoryList = await db.category.findMany({
		select: {
			id: true,
			name: true
		}
	});

	const createForm = await superValidate(event, productSchema);

	return {
		allProducts,
		createForm,
		categoryList
	};
};

export const actions = {
	create: async (event) => {
		const createForm = await superValidate(event, productSchema);

		if (!createForm.valid) {
			return fail(400, { createForm });
		}

		const categoryId = createForm.data.category;

		try {
			if (categoryId) {
				await db.product.create({
					data: {
						name: createForm.data.name,
						price: createForm.data.price,
						// description is optional
						description: createForm.data.description || null,
						image: placeholderProductImage,
						categories: {
							connect: {
								id: +categoryId
							}
						}
					}
				});
			} else {
				await db.product.create({
					data: {
						name: createForm.data.name,
						price: createForm.data.price,
						// description is optional
						description: createForm.data.description || null,
						image: placeholderProductImage
					}
				});
			}
		} catch (error) {
			console.log(error);
			return message(createForm, 'We encountered server error.', {
				status: 500
			});
		}

		return message(createForm, 'Product created!');
	},
	delete_product: async (event) => {
		const deleteForm = await superValidate(event, deleteProductSchema);

		if (!deleteForm.valid) {
			return message(deleteForm, 'unable to delete', {
				status: 400
			});
		}

		const sku = +deleteForm.data.sku;

		try {
			const numberOfCartItemsReferencingProduct = await db.cartItem.count({
				where: {
					productId: sku
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
				status: 500
			});
		}

		return {
			deleteForm
		};
	}
};
