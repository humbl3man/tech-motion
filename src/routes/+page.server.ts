import { db } from '$lib/db';

export const load = async (event) => {
	const categories = await db.category.findMany();

	return {
		categories
	};
};
