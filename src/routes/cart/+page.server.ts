import { db } from '$lib/db.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const productAddSchema = z.object({
	sku: z.string()
});

export const load = async (event) => {
	if (!event.locals?.user?.email) {
		throw redirect(303, '/products');
	}

	let cart = await db.cart.findUnique({
		where: {
			userId: event.locals.user.email
		}
	});

	// if for some reason cart is deleted, create one and return empty array of cart items
	if (!cart) {
		cart = await db.cart.create({
			data: {
				userId: event.locals.user.email
			}
		});

		return {
			cartItems: []
		};
	}

	const cartItems = await db.cartItem.findMany({
		where: {
			cartId: cart?.id
		},
		include: {
			product: true
		}
	});

	return {
		cartItems
	};
};

export const actions = {
	add: async (event) => {
		const form = await superValidate(event, productAddSchema);

		if (!event.locals.user) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		if (!form.valid) {
			return fail(400, {
				message: 'Unable to add product to cart. Missing SKU information.'
			});
		}

		const addToCartSku = Number(form.data.sku);
		const cart = await db.cart.findUnique({ where: { userId: event.locals.user.email } });
		const cartItem = await db.cartItem.findFirst({
			where: {
				productId: addToCartSku,
				cartId: cart?.id
			}
		});

		await db.cart.update({
			where: {
				userId: event.locals.user.email
			},
			data: {
				items: {
					upsert: {
						where: {
							id: cartItem?.id ?? 0
						},
						create: {
							quantity: 1,
							productId: addToCartSku
						},
						update: {
							quantity: {
								increment: 1
							}
						}
					}
				}
			},
			include: {
				items: true
			}
		});
	},
	remove: async (event) => {
		const form = await superValidate(event, productAddSchema);

		if (!event.locals.user) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		if (!form.valid) {
			return fail(400, {
				message: 'Unable to remove product. Missing SKU information.'
			});
		}

		const deleteSku = Number(form.data.sku);

		await db.cart.update({
			where: {
				userId: event.locals.user.email
			},
			data: {
				items: {
					deleteMany: [{ productId: deleteSku }]
				}
			}
		});
	}
};
