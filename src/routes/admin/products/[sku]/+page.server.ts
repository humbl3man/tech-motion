import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const productSchema = z.object({
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
	category: z.string(),
	description: z.string()
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
	const productForm = await superValidate(productSchema);

	return {
		product,
		productForm,
		categories
	};
};
