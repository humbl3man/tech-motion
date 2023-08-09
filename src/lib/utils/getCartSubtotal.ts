import type { CartItem } from '$lib/types';

export function getCartSubtotal(cartItems: CartItem) {
	return cartItems.reduce((total, item) => {
		total += item.quantity * item.product?.price;
		return total;
	}, 0);
}
