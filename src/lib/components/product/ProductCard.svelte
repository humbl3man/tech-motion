<script lang="ts">
	import { formatPrice } from '$lib/utils/formatPrice';
	import { slugify } from '$lib/utils/slugify';

	type Product = {
		sku: string | number;
		name: string;
		price: number;
		image?: string;
	};

	export let product: Product;
</script>

<article>
	<a href="/product/{product.sku}-{slugify(product.name)}">
		<div class="h-56">
			<img
				src={product.image || `/images/product/${product.sku}.jpg`}
				alt={product.name}
				class="h-full w-full rounded-lg object-cover"
				loading="lazy"
			/>
		</div>
		<div class="mt-4 font-semibold dark:text-slate-50">{product.name}</div>
		<div class="dark:text-slate-200">{formatPrice(product.price)}</div>
	</a>
</article>
