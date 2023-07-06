import { redirect } from '@sveltejs/kit';

export async function load(event) {
	if (!event.locals?.user?.email) {
		throw redirect(307, '/login');
	}

	return {};
}

export const actions = {
	update: async (event) => {
		console.log('running update action on user');
	},
	logout: async (event) => {
		console.log('running logout action on user');
		event.cookies.set('auth_token', '', {
			path: '/',
			expires: new Date(0)
		});
		throw redirect(307, '/login');
	}
};
