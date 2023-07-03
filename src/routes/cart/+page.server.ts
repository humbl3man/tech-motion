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

	const cart = await db.cart.findUnique({
		where: {
			userId: event.locals.user.email
		},
		select: {
			items: {
				select: {
					quantity: true,
					product: true
				}
			}
		}
	});

	return {
		cart
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

		await db.cart.update({
			where: {
				userId: event.locals.user.email
			},
			data: {
				items: {
					upsert: {
						where: {
							productId: addToCartSku
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
