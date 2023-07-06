<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import ProductCard from '$lib/components/product/ProductCard.svelte';

	export let data;
	$: products = data.products.sort((a, b) => a.sku - b.sku);
</script>

<Container size="wide">
	<h1 class="mb-8 text-4xl">All Products</h1>
	<div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each products as product (product.sku)}
			<ProductCard {product} />
		{/each}
	</div>
</Container>
