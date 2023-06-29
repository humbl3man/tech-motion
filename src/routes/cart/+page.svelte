<script>
	import Container from '$lib/components/Container.svelte';
	import { formatPrice } from '$lib/utils/formatPrice';

	export let data;

	$: ({ cart } = data);
	// $: console.log(cart);
</script>

<div class="mx-auto max-w-screen-md px-4">
	<h1 class="mb-8 text-3xl">Your Shopping Cart</h1>
	{#if cart?.items && cart.items.length > 0}
		{#each cart.items as item}
			<div class="grid grid-cols-[200px_1fr] gap-8 border-t-slate-100 py-8">
				<div>
					<img
						class="aspect-square rounded-lg object-cover"
						src={item.product.image}
						alt={item.product.name}
					/>
				</div>
				<div>
					<div class="flex items-center justify-between dark:text-slate-50">
						<span>{item.product.name}</span>

						<span>{formatPrice(item.product.price)}</span>
					</div>
					<div class="dark:text-slate-50/50">Quantity: {item.quantity}</div>
				</div>
			</div>
		{/each}
	{:else}
		<p>Cart is empty.</p>
	{/if}
</div>
