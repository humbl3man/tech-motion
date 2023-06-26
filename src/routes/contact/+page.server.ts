import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';

const schema = z.object({
	email: z
		.string({
			required_error: 'Email is required'
		})
		.email('Please enter a valid email'),
	name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
	message: z.string({ required_error: 'Message is required' }).min(1, 'Message is required')
});

export async function load(event) {
	const form = await superValidate(event, schema);
	return {
		form
	};
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, schema);

		if (!form.valid) {
			return fail(400, { form });
		}

		return message(form, 'Thank you for your message! We will get back to you shortly.');
	}
};
