import { db } from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals?.user?.email) {
		throw redirect(307, '/');
	}
	const order = await db.cart.findUnique({
		where: {
			userId: event.locals.user.email
		},
		select: {
			items: {
				select: {
					product: {
						select: {
							sku: true,
							name: true,
							image: true,
							price: true
						}
					},
					quantity: true
				}
			}
		}
	});

	// redirect to cart if no items are in cart.
	if (order?.items.length === 0) {
		throw redirect(307, '/cart');
	}

	return {
		order
	};
};
