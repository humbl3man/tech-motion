<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import { formatPrice } from '$lib/utils/formatPrice';
	import { Input, Label } from 'flowbite-svelte';
	import { getCartSubtotal } from '$lib/utils/getCartSubtotal';
	import IconCircle from '~icons/mdi/check-circle';
	import { ShippingRate } from '$lib/constants/ShippingRate.js';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	// stripe
	let clientSecret = data.client_secret;
	let success = false;

	// shipping method
	type ShippingType = 'standard' | 'express';
	let selectedShippingRate = ShippingRate.Standard;
	let selectedShipping: ShippingType = 'standard';

	function changeShippingMethod(type: ShippingType) {
		if (type === 'standard') {
			selectedShippingRate = ShippingRate.Standard;
		} else if (type === 'express') {
			selectedShippingRate = ShippingRate.Express;
		}
		selectedShipping = type;
	}

	$: cartItems = data.order?.items ?? [];
	$: subtotal = getCartSubtotal(cartItems);
	$: total = selectedShippingRate + subtotal;

	// form
	const { form: checkoutForm, errors: checkoutFormErrors } = superForm(data.form);
	$: console.log(checkoutForm, checkoutFormErrors);
</script>

<Container>
	<section class="grid gap-16 md:grid-cols-2">
		<div>
			<h2 class="mb-8 text-2xl">Shipping Address</h2>
			<form method="post">
				<div class="flex flex-col gap-4 border-b border-slate-100 pb-8 dark:border-slate-700">
					<div class="grid grid-cols-2 gap-4">
						<div>
							<Label for="firstName">First Name</Label>
							<Input
								type="text"
								name="firstName"
								id="firstName"
							/>
						</div>
						<div>
							<Label for="lastName">Last Name</Label>
							<Input
								type="text"
								name="lastName"
								id="lastName"
							/>
						</div>
					</div>
					<div class="flex flex-col gap-2">
						<Label for="address1">Address</Label>
						<Input
							type="text"
							name="address1"
							id="address1"
						/>
					</div>
					<div class="flex flex-col gap-2">
						<Label for="address2">Address 2 (unit, apartment)</Label>
						<Input
							type="text"
							name="address2"
							id="address2"
						/>
					</div>
				</div>
				<div class="flex flex-col pt-8">
					<h3 class="mb-4 text-lg">Select Delivery Method</h3>
					<div class="grid grid-cols-2 gap-6">
						<input
							type="hidden"
							name="shippingType"
							value={selectedShipping}
						/>
						<button
							on:click={() => changeShippingMethod('standard')}
							type="button"
							class="relative border px-4 pb-6 pt-4 text-left hover:border-indigo-500 dark:text-white {selectedShippingRate ===
							ShippingRate.Standard
								? 'border-indigo-600'
								: 'border-slate-200 text-slate-700 dark:border-slate-500'}"
						>
							{#if selectedShippingRate === ShippingRate.Standard}
								<span class="absolute right-3 top-3 text-base text-indigo-500"><IconCircle /></span>
							{/if}
							<div class="mb-2">Standard</div>
							<div class="mb-8 text-sm text-slate-600 dark:text-slate-400">Ships in 5-8 days</div>
							<div class="text-base text-slate-900 dark:text-slate-100">{formatPrice(ShippingRate.Standard)}</div>
						</button>
						<button
							on:click={() => changeShippingMethod('express')}
							type="button"
							class="relative border px-4 pb-6 pt-4 text-left hover:border-indigo-500 dark:text-white {selectedShippingRate ===
							ShippingRate.Express
								? 'border-indigo-600'
								: 'border-slate-200 text-slate-700 dark:border-slate-500'}"
						>
							{#if selectedShippingRate === ShippingRate.Express}
								<span class="absolute right-3 top-3 text-base text-indigo-500"><IconCircle /></span>
							{/if}
							<div class="mb-2">Express</div>
							<div class="mb-8 text-sm text-slate-600 dark:text-slate-400">Ships in 1-2 days</div>
							<div class="text-base text-slate-900 dark:text-slate-100">{formatPrice(ShippingRate.Express)}</div>
						</button>
					</div>
				</div>
			</form>
		</div>
		<div>
			<h2 class="mb-8 text-2xl">Order Summary</h2>
			<section class="rounded-md border border-slate-200 bg-slate-50 py-8 dark:border-slate-600 dark:bg-slate-700">
				<div class="mb-8 max-h-[600px] overflow-auto border-b border-slate-200 px-6 pb-8 dark:border-slate-600">
					{#if data.order}
						{#each data.order.items as { product, quantity }}
							<div class="mb-4 flex gap-6 first-of-type:mt-4 last-of-type:mb-0">
								<img
									src={product.image}
									alt={product.name}
									class="h-28 w-28 rounded-md"
								/>
								<div>
									<p class="mb-1 text-black dark:text-white">{product.name}</p>
									<p class="text-sm">Quantity: {quantity}</p>
									<p class="mt-8 text-sm text-black dark:text-white">{formatPrice(product.price)}</p>
								</div>
							</div>
						{/each}
					{:else}
						<p>No order items.</p>
					{/if}
				</div>
				<div class="flex flex-col gap-4 px-6 pb-8">
					<div class="flex justify-between">
						<span class="dark:text-slate-300">Subtotal:</span>
						<span class="dark:text-white">{formatPrice(subtotal)}</span>
					</div>
					<div class="flex justify-between">
						<span class="dark:text-slate-300">Shipping:</span>
						<span class="dark:text-white">{formatPrice(selectedShippingRate)}</span>
					</div>
					<div class="flex justify-between border-t border-slate-200 pt-4 dark:border-slate-600">
						<span class="dark:text-slate-300">Total:</span>
						<span class="dark:text-white">{formatPrice(total)}</span>
					</div>
				</div>
			</section>
		</div>
	</section>
</Container>
