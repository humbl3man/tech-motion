import { db } from '$lib/db.js';

export const load = async (event) => {
	const categories = await db.category.findMany();

	return {
		categories
	};
};
