import { db } from '$lib/db';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const auth: Handle = async ({ event, resolve }) => {
	const authCookie = event.cookies.get('auth_token');

	if (!authCookie) return await resolve(event);

	const user = await db.user.findUnique({
		where: {
			authToken: authCookie
		},
		select: {
			email: true,
			id: true,
			firstName: true,
			lastName: true,
			roleId: true
		}
	});

	if (user) {
		event.locals.user = {
			email: user.email,
			id: user.id,
			firstName: user.firstName || '',
			lastName: user.lastName || '',
			role: user.roleId
		};
	}

	return await resolve(event);
};

export const handle = sequence(auth);
