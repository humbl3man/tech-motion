import bcrypt from 'bcrypt';
import { z } from 'zod';
import { message, setError, superValidate } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { Role } from '$lib/constants/Role.js';

const schema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, 'Email is required')
		.email('Please enter a valid email address'),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, 'Password must be between 6 and 20 characters long')
		.max(20, 'Password must be between 6 and 20 characters long'),
	passwordConfirmation: z.string({ required_error: 'Password confirmation is required' })
});

export const load = async (event) => {
	if (event.locals.user) throw redirect(303, '/account');
	const form = await superValidate(event, schema);
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, schema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const user = await db.user.findUnique({ where: { email: form.data.email } });

		// check if user already exists and return error.
		if (user) {
			form.data.password = '';
			return message(form, 'We are having trouble registering your account. Please try again.');
		}

		if (form.data.password !== form.data.passwordConfirmation) {
			return setError(form, 'passwordConfirmation', 'Passwords do not match');
		}

		try {
			const createdUser = await db.user.create({
				data: {
					email: form.data.email,
					passwordHash: await bcrypt.hash(form.data.password, 10),
					authToken: crypto.randomUUID(),
					role: {
						connect: {
							id: Role.USER
						}
					}
				}
			});

			// create new cart after registering user
			await db.cart.create({
				data: {
					userId: createdUser.email
				}
			});
		} catch (err: unknown) {
			throw error(500, 'Something went wrong');
		}

		throw redirect(307, '/login');
	}
};
