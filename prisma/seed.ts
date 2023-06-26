import { PrismaClient } from '@prisma/client';

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

const attributes = [
	{ id: 1, value: 'Color' },
	{ id: 2, value: 'Size' },
	{ id: 3, value: 'Material' },
	{ id: 4, value: 'Weight' },
	{ id: 5, value: 'Brand' },
	{ id: 6, value: 'Style' }
];

const categories = [
	{ id: 1, name: 'Smart Watches' },
	{ id: 2, name: 'Smart Scales' },
	{ id: 3, name: 'Stationary Bikes' },
	{ id: 4, name: 'Headphones' }
];

// TODO: Seed product data, or create UI for admin to add products
// const products = [
// 	{
//     id: 1,
//     name: 'Men\'s Running Shoes',
//     categories: [
//       { id: 8, name: 'Sneakers' }
//     ],
//     attributes: [
//       { id: 2, value: 'XL' }, // Size: XL
//       { id: 5, value: 'Nike' }, // Brand: Nike
//       { id: 1, value: 'Red' } // Color: Red
//     ],
//     price: 79.99,
//     image: 'men-running-shoes.jpg',
//     description: 'Comfortable running shoes for men',
//   },
//   {
//     id: 2,
//     name: 'Women\'s Sports Bra',
//     categories: [
//       { id: 6, name: 'Sports Bras' }
//     ],
//     attributes: [
//       { id: 2, value: 'M' }, // Size: M
//       { id: 6, value: 'Modern' }, // Style: Modern
//       { id: 9, value: 'V-Neck' } // Neckline: V-Neck
//     ],
//     price: 39.99,
//     image: 'women-sports-bra.jpg',
//     description: 'Supportive sports bra for women',
//   },
// ];

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
