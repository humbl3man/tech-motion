<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { formatPrice } from '$lib/utils/formatPrice';

	export let data;
	let deleteSkus: Array<number | string> = [];

	$: ({ cart } = data);
</script>

<div class="mx-auto max-w-screen-md px-4">
	<h1 class="mb-8 text-3xl">Your Shopping Cart</h1>
	{#if cart?.items && cart.items.length > 0}
		{#each cart.items as item}
			<div class="grid grid-cols-[200px_1fr] gap-8 border-t-slate-100 py-8">
				<div>
					<a href="/product/{item.product.sku}">
						<img
							class="aspect-square rounded-lg object-cover"
							src={item.product.image}
							alt={item.product.name}
						/>
					</a>
				</div>
				<div>
					<div class="flex items-center justify-between dark:text-slate-50">
						<a
							class="hover:underline"
							href="/product/{item.product.sku}">{item.product.name}</a
						>
						<span>{formatPrice(item.product.price)}</span>
					</div>
					<div class="dark:text-slate-50/50">Quantity: {item.quantity}</div>
					<!-- remove from cart -->
					<div class="mt-4">
						<form
							method="post"
							action="?/remove"
							use:enhance={() => {
								deleteSkus = [...deleteSkus, item.product.sku];
								return async ({ result }) => {
									await invalidateAll();
									await applyAction(result);
									deleteSkus = deleteSkus.filter((sku) => sku !== item.product.sku);
								};
							}}
						>
							<input
								type="hidden"
								name="sku"
								value={item.product.sku}
							/>
							<button
								class="underline disabled:text-slate-300 dark:text-slate-300 disabled:dark:text-slate-500"
								disabled={deleteSkus.includes(item.product.sku)}
							>
								{#if deleteSkus.includes(item.product.sku)}
									Removing...
								{:else}
									Remove from bag
								{/if}
							</button>
						</form>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<p>Cart is empty.</p>
	{/if}
</div>
