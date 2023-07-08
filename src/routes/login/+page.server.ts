import bcrypt from 'bcrypt';
import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { Role } from '$lib/constants/Role.js';

const schema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, 'Email is required')
		.email('Please enter a valid email address'),
	password: z.string({ required_error: 'Password is required' })
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

		if (!user) {
			form.data.password = '';
			return message(form, 'Invalid credentials. Please try again.');
		}

		const passwordMatch = await bcrypt.compare(form.data.password, user.passwordHash);

		if (!passwordMatch) {
			form.data.password = '';
			return message(form, 'Invalid credentials. Please try again.');
		}

		try {
			const authUser = await db.user.update({
				where: { email: form.data.email },
				data: { authToken: crypto.randomUUID() }
			});
			event.cookies.set('auth_token', authUser.authToken, {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 30
			});
		} catch (err) {
			throw error(500, 'Something went wrong');
		}

		if (user.roleId === Role.ADMIN) {
			throw redirect(303, '/admin');
		} else {
			throw redirect(303, '/account');
		}
	}
};
