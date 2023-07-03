import { PrismaClient } from '@prisma/client';
import { attributes, categories, products } from './sample';

const db = new PrismaClient();

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
				sku: product.sku,
				description: product.description,
				price: product.price,
				name: product.name,
				image: product.image
			}
		});
	}
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
