import { db } from '$lib/db.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { category } = params;
	const categoryName = category.replaceAll('-', ' ');
	const products = await db.product.findMany({
		where: {
			categories: {
				some: {
					name: {
						equals: categoryName,
						mode: 'insensitive'
					}
				}
			}
		},
		include: {
			categories: {
				select: {
					name: true
				}
			}
		}
	});

	if (!products.length) {
		throw error(404);
	}

	return {
		products
	};
};
