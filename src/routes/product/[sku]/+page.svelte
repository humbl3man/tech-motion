<script>
	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import Container from '$lib/components/Container.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { formatPrice } from '$lib/utils/formatPrice';
	import { slugify } from '$lib/utils/slugify';

	export let data;
	let isProcessing = false;

	$: ({ product } = data);
</script>

<Container>
	<section class="grid gap-8 sm:grid-cols-[minmax(200px,800px)_1fr]">
		<div>
			<img
				class="h-full w-full rounded-lg object-cover"
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
			<!-- add to cart -->
			{#if data.showAddToCart}
				<form
					method="POST"
					action="/cart/?/add"
					use:enhance={() => {
						isProcessing = true;
						return async ({ result }) => {
							await invalidateAll();
							await applyAction(result);
							isProcessing = false;
							goto('/cart');
						};
					}}
				>
					<input
						type="hidden"
						name="sku"
						value={product.sku}
					/>
					<button
						class="btn"
						type="submit"
					>
						{#if isProcessing}
							<Loader />
							Adding...
						{:else}
							Add to Bag
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</section>
</Container>
