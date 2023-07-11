import { Role } from '$lib/constants/Role.js';
import { db } from '$lib/db';

export const load = async ({ locals }) => {
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

export const actions = {
	delete_user: async (event) => {
		try {
			const formData = await event.request.formData();
			const userEmailToDelete = formData.get('user_email')?.toString().trim();
			const userCart = await db.cart.findUnique({
				where: {
					userId: userEmailToDelete
				}
			});

			// in some cases (for example data seed) user may not have a cart when created. To handle this check if cart exists, if not just delete the user
			if (!userCart) {
				await db.user.delete({
					where: {
						email: userEmailToDelete
					}
				});

				return {
					message: 'User deleted'
				};
			}

			const deleteUser = db.user.delete({
				where: {
					email: userEmailToDelete
				}
			});

			const deleteCart = db.cart.delete({
				where: {
					userId: userEmailToDelete
				}
			});

			const deleteCartItems = db.cartItem.deleteMany({
				where: {
					cartId: userCart?.id
				}
			});

			await db.$transaction([deleteCartItems, deleteCart, deleteUser]);

			return {
				message: 'User deleted'
			};
		} catch (error: any) {
			console.error('Failed to delete user', error.message);
			throw error(500, 'Failed to delete user');
		}
	}
};
