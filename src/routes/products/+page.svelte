<script lang="ts">
	import { formatPrice } from '$lib/utils/formatPrice';

	export let data;
	$: ({ products } = data);
</script>

<div class="container mx-auto max-w-screen-xl px-4">
	<h1 class="mb-8 text-4xl">All Products</h1>
	<div class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
		{#each products as product (product.sku)}
			<a href="/product/{product.sku}">
				<div class="h-56">
					<img
						src={product.image}
						alt={product.name}
						class="h-full w-full rounded-lg object-center"
					/>
				</div>
				<div class="mt-4 font-semibold dark:text-slate-50">{product.name}</div>
				<div class="dark:text-slate-200">{formatPrice(product.price)}</div>
			</a>
		{/each}
	</div>
</div>
