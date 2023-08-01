<script lang="ts">
	import { page } from '$app/stores';
	import Container from '$lib/components/Container.svelte';
	import ProductCard from '$lib/components/product/ProductCard.svelte';
	import { toTitleCase } from '$lib/utils/titleCase';

	export let data;

	$: products = data.products.sort((a, b) => a.sku - b.sku);
	$: categoryTitle = toTitleCase($page.params.category.replaceAll('-', ' '));
</script>

<Container size="wide">
	<h1 class="mb-8 text-4xl">{categoryTitle}</h1>
	<div class="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each products as product (product.sku)}
			<ProductCard {product} />
		{/each}
	</div>
</Container>
