import { db } from '$lib/db.js';
import { fail } from '@sveltejs/kit';

import { message, superValidate } from 'sveltekit-superforms/server';
import { placeholderProductImage } from '$lib/constants/image';
import { productSchema } from '$lib/validation/productSchema';

export const load = async () => {
	// get list of products
	const products = await db.product.findMany({
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

	const createForm = await superValidate(productSchema);

	return {
		products,
		createForm,
		categoryList
	};
};

export const actions = {
	create: async (event) => {
		const createForm = await superValidate(event.request, productSchema);

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
					image: placeholderProductImage,
					categories: {
						connect: {
							id: +createForm.data.category
						}
					}
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
