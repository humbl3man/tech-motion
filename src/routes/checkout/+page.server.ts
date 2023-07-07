import { db } from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals?.user?.email) {
		throw redirect(307, '/');
	}
	const cart = await db.cart.findUnique({
		where: {
			userId: event.locals.user.email
		},
		include: {
			items: true
		}
	});

	if (cart?.items.length === 0) {
		throw redirect(307, '/cart');
	}

	return {
		cart
	};
};
