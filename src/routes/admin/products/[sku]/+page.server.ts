import { db } from '$lib/db';
import { productSchema } from '$lib/validation/productSchema';
import { error, fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

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

	console.log(product);

	if (!product) {
		throw error(404, 'Product Not Found');
	}

	const categories = await db.category.findMany({
		select: {
			id: true,
			name: true
		}
	});

	const productForm = await superValidate(
		{ ...product, sku: product.sku.toString(), description: product.description || '' },
		productSchema
	);

	return {
		product,
		productForm,
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

		console.log(form.data);

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
	}
};
