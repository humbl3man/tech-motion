import { Role } from '$lib/constants/Role.js';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals?.user?.email) {
		throw redirect(307, '/login');
	}

	// prevent non-admin users from accessing this page
	if (event.locals.user.role !== Role.ADMIN) {
		throw redirect(307, '/account');
	}
};
