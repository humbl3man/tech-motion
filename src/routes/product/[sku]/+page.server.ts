import { db } from '$lib/db.js';
import { error } from '@sveltejs/kit';

export const load = async ({ request, params, locals }) => {
	const { sku } = params;

	const product = await db.product.findUnique({ where: { sku: Number(sku) }, include: { categories: true } });

	if (!product) {
		throw error(404, 'Product not found');
	}

	return {
		product,
		showAddToCart: !!locals.user?.email
	};
};
