import { placeholderProductImage } from '$lib/constants/image.js';
import { db } from '$lib/db.js';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const createProductSchema = z.object({
	name: z
		.string({
			required_error: 'Product name is required'
		})
		.min(5, 'Product name must be at least 5 characters long'),
	price: z
		.number({
			required_error: 'Product price is required'
		})
		.min(100, 'Product price minimum is $1')
		.max(1000000, 'Product price cannot exceed $10,000'),
	description: z.string().optional()
});

export const load = async (event) => {
	const allProducts = await db.product.findMany({
		orderBy: {
			sku: 'asc'
		}
	});

	const createForm = await superValidate(event, createProductSchema);

	return {
		allProducts,
		createForm
	};
};

export const actions = {
	create: async (event) => {
		const createForm = await superValidate(event, createProductSchema);

		if (!createForm.valid) {
			return fail(400, { createForm });
		}

		try {
			await db.product.create({
				data: {
					name: createForm.data.name,
					price: createForm.data.price,
					image: placeholderProductImage
				}
			});
		} catch (error) {
			console.log(error);
			return message(createForm, 'We encountered server error.', {
				status: 500
			});
		}

		return message(createForm, 'Product created!');
	},
	delete_product: async (event) => {
		const formData = await event.request.formData();
		const sku = formData.get('sku');

		console.log('DELETE', formData, sku);

		if (!sku) {
			return fail(400, {
				message: 'Missing SKU'
			});
		}

		try {
			const numberOfCartItemsReferencingProduct = await db.cartItem.count({
				where: {
					productId: +sku
				}
			});

			// delete all cart items and products if at least 1 user cart has this product.
			if (numberOfCartItemsReferencingProduct > 0) {
				await db.cartItem.deleteMany({
					where: {
						productId: +sku
					}
				});
			}

			await db.product.delete({
				where: {
					sku: +sku
				}
			});
		} catch (error: any) {
			console.error(error.message);
			return fail(500, {
				message: 'Unable to delete'
			});
		}

		return {
			message: 'Product deleted'
		};
	}
};
