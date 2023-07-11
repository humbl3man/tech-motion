<script lang="ts">
	import type { Product } from '$lib/types';
	import { formatPrice } from '$lib/utils/formatPrice';
	import { slugify } from '$lib/utils/slugify';

	export let product: Product;
</script>

<article>
	<a href="/product/{product.sku}-{slugify(product.name)}">
		<div>
			<img
				src={product.image}
				alt={product.name}
				width={1080}
				height={1080}
				class="h-full w-full rounded-lg object-cover"
				loading="lazy"
			/>
		</div>
		<div class="mt-4 font-semibold dark:text-slate-50">{product.name}</div>
		<div class="dark:text-slate-200">{formatPrice(product.price)}</div>
	</a>
</article>
