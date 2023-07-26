import { db } from '$lib/db.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const userUpdateSchema = z.object({
	// email: z.string(),
	firstName: z.nullable(z.string().min(2, 'First name must contain at least 2 characters').optional()),
	lastName: z.nullable(z.string().min(2, 'Last name must contain at least 2 characters').optional()),
	phoneNumber: z.nullable(z.string().optional()),
	shippingAddress: z.nullable(z.string().optional())
});

const userDeleteSchema = z.object({
	id: z.number(),
	email: z.string().email()
});

export const load = async ({ params }) => {
	const userId = Number(params.user_id);

	const user = await db.user.findUnique({
		where: {
			id: userId
		},
		select: {
			id: true,
			email: true,
			firstName: true,
			lastName: true,
			phoneNumber: true,
			// shippingAddress: true,
			roleId: true
		}
	});

	if (!user) {
		throw error(404, 'User not found');
	}

	const userObject: Partial<typeof user> = {
		firstName: user.firstName,
		lastName: user.lastName,
		phoneNumber: user.phoneNumber
		// shippingAddress: user.shippingAddress
	};

	const updateUserForm = await superValidate(userObject, userUpdateSchema);
	const deleteUserForm = await superValidate(
		{
			email: user.email,
			id: user.id
		},
		userDeleteSchema
	);

	return {
		userProfile: user,
		deleteUserForm,
		updateUserForm
	};
};

export const actions = {
	update: async (event) => {
		const form = await superValidate(event, userUpdateSchema);
		const userId = Number(event.params.user_id);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await db.user.update({
				where: {
					id: userId
				},
				data: {
					firstName: form.data.firstName,
					lastName: form.data.lastName,
					phoneNumber: form.data.phoneNumber
				}
			});

			return message(form, 'User updated');
		} catch (error: any) {
			return message(form, 'Unable to update user', {
				status: 500
			});
		}
	},
	delete: async (event) => {
		const form = await superValidate(event, userDeleteSchema);

		// cannot delete yourself
		if (form.data.email === event.locals.user.email) {
			return message(form, 'Unable to delete user', {
				status: 400
			});
		}

		if (!form.valid) {
			return message(form, 'Unable to delete user', {
				status: 400
			});
		}

		const userEmail = form.data.email;
		const userId = Number(form.data.id);

		const userCart = await db.cart.findUnique({
			where: {
				userId: userEmail
			}
		});

		// in some cases (for example data seed) user may not have a cart when created. To handle this check if cart exists, if not just delete the user
		if (!userCart) {
			try {
				await db.user.delete({
					where: {
						id: userId
					}
				});
			} catch (error: any) {
				console.error(error.message);
				return message(form, 'Unable to delete user', {
					status: 500
				});
			}

			throw redirect(307, '/admin/users');
		}

		const deleteUser = db.user.delete({
			where: {
				id: userId
			}
		});

		const deleteCart = db.cart.delete({
			where: {
				userId: userEmail
			}
		});

		const deleteCartItems = db.cartItem.deleteMany({
			where: {
				cartId: userCart?.id
			}
		});

		try {
			await db.$transaction([deleteCartItems, deleteCart, deleteUser]);
		} catch (error: any) {
			console.error(error.message);
			return message(form, 'Unable to delete user', {
				status: 500
			});
		}
		throw redirect(307, '/admin/users');
	}
};
