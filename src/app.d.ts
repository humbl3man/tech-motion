// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				id: number;
				email: string;
				role: number;
				firstName?: string;
				lastName?: string;
				phoneNumber?: string;
				shippingAddress?: string;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
