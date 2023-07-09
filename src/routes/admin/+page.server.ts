import { db } from '$lib/db.js';

export const load = async () => {
	const userCount = await db.user.count();
	const productCount = await db.product.count();

	return {
		userCount,
		productCount
	};
};
