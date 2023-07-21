import { Role } from '$lib/constants/Role.js';
import { db } from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals?.user?.email) {
		throw redirect(307, '/login');
	}

	// prevent non-admin users from accessing this page
	if (event.locals.user.role !== Role.ADMIN) {
		throw redirect(307, '/account');
	}

	const userCount = await db.user.count({
		where: {
			// filter by user role, only return users not admins
			// admin cannot modify or delete other admins
			NOT: {
				role: {
					is: {
						id: Role.ADMIN
					}
				}
			}
		}
	});
	const productCount = await db.product.count();

	return {
		userCount,
		productCount
	};
};
