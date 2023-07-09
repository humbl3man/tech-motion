import { Role } from '$lib/constants/Role';
import { db } from '$lib/db.js';

export const load = async () => {
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
