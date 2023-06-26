<script>
	import Container from '$lib/components/Container.svelte';
	import { formatPrice } from '$lib/utils/formatPrice';
	import { slugify } from '$lib/utils/slugify';
	export let data;
	$: ({ product } = data);
</script>

<Container>
	<section class="flex flex-col gap-12 sm:flex-row">
		<div class="h-[480px]">
			<img
				class="h-full w-full rounded-lg object-cover object-center"
				src={product.image}
				alt={product.name}
			/>
		</div>
		<div>
			{#each product.categories as category (category.id)}
				<a
					class="link mb-2"
					href="/products/{slugify(category.name)}">{category.name}</a
				>
			{/each}
			<h1 class="mb-4 text-4xl">{product.name}</h1>
			<div class="mb-4 text-3xl dark:text-slate-100">{formatPrice(product.price)}</div>
			<p class="mb-4">{product.description}</p>
			<button class="btn">Add to Bag</button>
		</div>
	</section>
</Container>
