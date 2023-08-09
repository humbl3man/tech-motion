export type Product = {
	sku: string | number;
	name: string;
	price: number;
	image?: string;
};

export type CartItem = {
	product: {
		sku: number;
		name: string;
		image: string;
		price: number;
	};
	quantity: number;
}[];
