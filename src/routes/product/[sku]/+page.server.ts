import { db } from '$lib/db.js';
import { error } from '@sveltejs/kit';

export const load = async ({ request, params, locals }) => {
	const { sku: urlSKU } = params;
	const sku = Number(urlSKU.split('-')[0]);

	if (isNaN(sku)) {
		throw error(404, 'Product not found');
	}

	const product = await db.product.findUnique({ where: { sku: sku }, include: { categories: true } });

	if (!product) {
		throw error(404, 'Product not found');
	}

	return {
		product,
		showAddToCart: !!locals.user?.email
	};
};
