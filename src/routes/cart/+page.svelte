<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { formatPrice } from '$lib/utils/formatPrice';

	export let data;
	let deleteSkus: Array<number | string> = [];

	$: cartItems = data.cartItems ?? [];
	$: subtotal = cartItems.reduce((total, item) => {
		total += item.quantity * item.product?.price;
		return total;
	}, 0);
	$: isCheckoutDisabled = subtotal <= 0;
</script>

<div class="mx-auto mb-16 max-w-screen-md px-4">
	<h1 class="mb-8 text-3xl">Your Shopping Cart</h1>
	{#each cartItems as item}
		<div class="grid grid-cols-[200px_1fr] gap-8 border-t-slate-100 py-4">
			<div>
				<a href="/product/{item.product.sku}">
					<img
						class="aspect-square rounded-lg object-cover"
						src={item.product.image}
						alt={item.product.name}
						loading="lazy"
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
	{:else}
		<p>Your Shopping Cart is empty.</p>
	{/each}
	<div class="mt-12">
		<div class="mb-1 flex items-center justify-between text-lg font-semibold text-slate-800 dark:text-slate-200">
			<span>Subtotal</span>
			<span>{formatPrice(subtotal)}</span>
		</div>
		<div class="text-slate-600 dark:text-slate-400">Shipping and taxes calculated at checkout.</div>
		{#if !isCheckoutDisabled}
			<div class="mt-6">
				<a
					href="/checkout"
					class="btn block w-full">Checkout</a
				>
			</div>
		{/if}
	</div>
</div>
