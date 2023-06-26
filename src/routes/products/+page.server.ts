import { db } from '$lib/db.js';

export const load = async (event) => {
	const allProducts = await db.product.findMany({
		select: {
			sku: true,
			name: true,
			price: true,
			image: true
		}
	});

	return {
		products: allProducts
	};
};
