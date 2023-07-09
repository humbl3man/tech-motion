import { db } from '$lib/db.js';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const placeholderImage = 'https://placehold.co/1080x1080';

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
		.min(100, 'Product price must be at least $1'),
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

		// TODO: logic for creating the product after validation

		await db.product.create({
			data: {
				name: createForm.data.name,
				price: createForm.data.price,
				description: createForm.data.description || '',
				image: placeholderImage
			}
		});

		return message(createForm, 'Product created!');
	}
};
