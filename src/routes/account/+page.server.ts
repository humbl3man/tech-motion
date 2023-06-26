import { redirect } from '@sveltejs/kit';

export async function load() {
	// TODO: this needs to return account data
	return {};
}

export const actions = {
	logout: async (event) => {
		event.cookies.set('auth_token', '', {
			path: '/',
			expires: new Date(0)
		});
		throw redirect(307, '/login');
	}
};
