import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { db } from '$lib/db.js';

const accountSchema = z.object({
	firstName: z.string().min(1, 'Please enter at least 1 character').optional(),
	lastName: z.string().min(1, 'Please enter at least 1 character').optional(),
	phoneNumber: z.string().optional()
});

export async function load(event) {
	if (!event.locals?.user?.email) {
		throw redirect(307, '/login');
	}

	const form = await superValidate(event.locals.user, accountSchema);

	return {
		form
	};
}

export const actions = {
	update: async (event) => {
		const form = await superValidate(event, accountSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await db.user.update({
				where: {
					email: event.locals.user.email
				},
				data: {
					firstName: form.data.firstName,
					lastName: form.data.lastName,
					phoneNumber: form.data.phoneNumber
				}
			});
		} catch (err) {
			return message(form, 'There was an error update account information', {
				status: 500
			});
		}

		return message(form, 'Account information was updated.');
	},
	logout: async (event) => {
		event.cookies.set('auth_token', '', {
			path: '/',
			expires: new Date(0)
		});
		throw redirect(307, '/login');
	}
};
