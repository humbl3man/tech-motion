import { db } from '$lib/db.js';

export const load = async (event) => {
	const allProducts = await db.product.findMany({
		orderBy: {
			sku: 'asc'
		}
	});

	return {
		allProducts
	};
};
