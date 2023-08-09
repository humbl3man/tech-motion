import { db } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import Stripe from 'stripe';
import { z } from 'zod';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import { getCartSubtotal } from '$lib/utils/getCartSubtotal';
import { ShippingRate } from '$lib/constants/ShippingRate';
import { superValidate } from 'sveltekit-superforms/server';

const checkoutSchema = z.object({
	firstName: z.string({ required_error: 'Please enter first name' }).min(1, 'Please enter first name'),
	lastName: z.string({ required_error: 'Please enter last name' }).min(1, 'Please enter last name'),
	shippingType: z.number({ required_error: 'Shipping Type is required' }),
	address1: z.string({ required_error: 'Shipping Address is required' }).min(1, 'Shipping Address is required'),
	address2: z.string().optional()
});

const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2022-11-15'
});

export const load = async (event) => {
	// for now, only signed-in users can checkout
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
	if (!order || order?.items.length === 0) {
		throw redirect(307, '/cart');
	}

	const form = await superValidate(checkoutSchema);

	const amount = getCartSubtotal(order.items) + ShippingRate.Standard;

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: 'usd',
		automatic_payment_methods: {
			enabled: true
		}
	});

	return {
		form,
		order,
		client_secret: paymentIntent.client_secret
	};
};

export const actions = {
	default: async ({ request }) => {
		console.log(request);
	}
};
