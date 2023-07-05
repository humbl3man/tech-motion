// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
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
