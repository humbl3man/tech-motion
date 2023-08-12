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
			firstName: true,
			lastName: true,
			phoneNumber: true,
			roleId: true
		}
	});

	if (user) {
		event.locals.user = {
			email: user.email,
			firstName: user.firstName || '',
			lastName: user.lastName || '',
			phoneNumber: user.phoneNumber || '',
			role: user.roleId
		};
	}

	return await resolve(event);
};

const logger: Handle = async ({ event, resolve }) => {
	const url = event.request.url;

	const start = performance.now();
	const response = await resolve(event);
	const end = performance.now();

	const duration = end - start;
	const message = `${event.request.method} request url ${url} took ${duration.toFixed(2)}ms`;

	if (duration > 1000) {
		console.log(`🐢 ${message}`);
	} else {
		console.log(`🚀 ${message}`);
	}

	return response;
};

export const handle = sequence(auth, logger);
