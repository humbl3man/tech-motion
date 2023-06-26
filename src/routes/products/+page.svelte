<script lang="ts">
	import { formatPrice } from '$lib/utils/formatPrice';

	export let data;
	$: ({ products } = data);
	$: console.log(products);
</script>

<div class="container mx-auto max-w-screen-xl px-4">
	<h1 class="mb-8 text-4xl">All Products</h1>
	<div class="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
		{#each products as product (product.sku)}
			<a href="/product/{product.sku}">
				<div class="h-56">
					<img
						src={product.image}
						alt={product.name}
						class="h-full w-full rounded-lg object-cover"
					/>
				</div>
				<div class="mt-4 font-bold">{product.name}</div>
				<div>{formatPrice(product.price)}</div>
			</a>
		{/each}
	</div>
</div>
