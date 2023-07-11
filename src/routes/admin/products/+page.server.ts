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
	}
};
