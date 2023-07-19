import { z } from 'zod';

export const productSchema = z.object({
	sku: z.string(),
	name: z
		.string({
			required_error: 'Product name is required'
		})
		.min(5, 'Product name must be at least 5 characters long'),
	price: z
		.number({
			required_error: 'Product price is required'
		})
		.min(100, 'Product price minimum is $1')
		.max(10000000, 'Product price cannot exceed $10,000'),
	description: z.string().default(''),
	category: z.string().default('')
});
