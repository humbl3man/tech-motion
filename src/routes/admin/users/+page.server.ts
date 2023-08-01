import { Role } from '$lib/constants/Role.js';
import { db } from '$lib/db';

export const load = async () => {
	const allUsersData = await db.user.findMany({
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
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			createdAt: true,
			updatedAt: true,
			phoneNumber: true,
			shippingAddress: true,
			email: true,
			role: true
		}
	});
	return {
		allUsersData
	};
};
