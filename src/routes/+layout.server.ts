import { db } from '$lib/db.js';

export async function load({ locals }) {
	let cartCount = 0;

	// get cart count
	if (locals.user?.email) {
		const cart = await db.cart.findUnique({
			where: { userId: locals.user.email },
			include: {
				items: true
			}
		});
		cartCount =
			cart?.items?.reduce((acc, item) => {
				acc += item.quantity;
				return acc;
			}, 0) ?? 0;
	}

	return {
		user: locals.user,
		cartCount
	};
}
