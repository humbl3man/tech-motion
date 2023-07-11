import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { attributes, categories, products, users } from './sample';

const db = new PrismaClient();

async function createAdminUser() {
	try {
		if (typeof process.env.ADMIN_EMAIL === 'string' && typeof process.env.ADMIN_PASSWORD === 'string') {
			const userAlreadyExists = await db.user.findUnique({
				where: { email: process.env.ADMIN_EMAIL }
			});

			if (userAlreadyExists) {
				return;
			}

			const admin = await db.user.create({
				data: {
					email: process.env.ADMIN_EMAIL,
					passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
					authToken: crypto.randomUUID(),
					firstName: 'Admin',
					lastName: 'Admin',
					role: {
						connect: {
							// admin role
							id: 2
						}
					}
				}
			});
			// and we also need to create cart for admin user
			await db.cart.create({
				data: {
					userId: admin.email
				}
			});
		} else {
			throw Error('Unable to create user: missing admin email or password');
		}
	} catch (err) {
		console.error(err.message);
	}
}

async function createUsers() {
	try {
		for (const user of users) {
			await db.user.upsert({
				where: {
					email: user.email
				},
				update: {
					firstName: user.firstName,
					lastName: user.lastName,
					phoneNumber: user.phoneNumber
				},
				create: {
					email: user.email,
					passwordHash: await bcrypt.hash(user.password, 10),
					authToken: crypto.randomUUID(),
					role: {
						connect: {
							id: 1
						}
					}
				}
			});
		}
	} catch (err) {
		console.error(err.message);
	}
}

const roles = [
	{
		id: 1,
		name: 'User'
	},
	{
		id: 2,
		name: 'Admin'
	}
];

async function main() {
	// roles
	for (const role of roles) {
		await db.role.upsert({
			where: { id: role.id },
			update: { name: role.name },
			create: {
				id: role.id,
				name: role.name
			}
		});
	}

	// attributes
	for (const attribute of attributes) {
		await db.attribute.upsert({
			where: { id: attribute.id },
			update: { value: attribute.value },
			create: {
				id: attribute.id,
				value: attribute.value
			}
		});
	}

	// categories
	for (const category of categories) {
		await db.category.upsert({
			where: { id: category.id },
			update: {
				name: category.name
			},
			create: {
				id: category.id,
				name: category.name
			}
		});
	}

	// products
	for (const product of products) {
		await db.product.upsert({
			where: { sku: product.sku },
			// no need to update if product is already in database
			update: {},
			create: {
				description: product.description,
				price: product.price,
				name: product.name,
				image: product.image
			}
		});
	}

	// create our admin user
	await createAdminUser();
	// create sample users
	await createUsers();
}

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error('Data seed failed.', e.message);
		await db.$disconnect();
		process.exit(1);
	});
