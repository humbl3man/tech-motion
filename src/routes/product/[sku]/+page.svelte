<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Container from '$lib/components/Container.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { formatPrice } from '$lib/utils/formatPrice';
	import { slugify } from '$lib/utils/slugify';
	import { Toast } from 'flowbite-svelte';
	import { onDestroy } from 'svelte';
	import { blur } from 'svelte/transition';
	import IconCart from '~icons/mdi/cart';

	export let data;

	let isProcessing = false;
	let showAddToCartToast = false;
	let counter = 5;

	function triggerAddToCartToast() {
		showAddToCartToast = true;
		counter = 5;
		addToCartToastTimeout();
	}

	function addToCartToastTimeout() {
		if (--counter > 0) {
			setTimeout(addToCartToastTimeout, 1000);
		} else {
			showAddToCartToast = false;
		}
	}
	$: ({ product } = data);
</script>

<Container>
	<section class="flex flex-col gap-8 sm:flex-row">
		<div>
			<img
				class="rounded-lg object-contain"
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
			{#if product.description}
				<p class="mb-4">{product.description}</p>
			{/if}
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

							if (result.type === 'success') {
								triggerAddToCartToast();
							}
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
							Add to Cart
						{/if}
					</button>
					<Toast
						color="indigo"
						transition={blur}
						class="mt-2 dark:text-white"
						params={{ amount: 10 }}
						bind:open={showAddToCartToast}
					>
						<svelte:fragment slot="icon">
							<IconCart />
							<span class="sr-only">Cart Icon</span>
						</svelte:fragment>
						<span>Item added to cart.</span>
					</Toast>
				</form>
			{/if}
		</div>
	</section>
</Container>
