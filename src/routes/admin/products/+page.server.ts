import { db } from '$lib/db.js';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import type { SuperValidated } from 'sveltekit-superforms';

import { message, superValidate } from 'sveltekit-superforms/server';
import { placeholderProductImage } from '$lib/constants/image.js';

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
	description: z.string()
});

const deleteProductSchema = z.object({
	sku: z.string()
});

export const load = async (event) => {
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

	const createForm = await superValidate(event, createProductSchema);
	const deleteForms: Array<SuperValidated<typeof deleteProductSchema>> = [];

	allProducts.forEach(async (product) => {
		const form = await superValidate(deleteProductSchema, {
			id: product.sku.toString()
		});
		deleteForms.push(form);
	});

	return {
		allProducts,
		createForm,
		deleteForms
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
					// description is optional
					description: createForm.data.description || null,
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
