<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import { formatPrice } from '$lib/utils/formatPrice.js';
	import { Input, Label } from 'flowbite-svelte';

	export let data;
</script>

<Container>
	<section class="grid gap-16 md:grid-cols-2">
		<div>
			<h2 class="mb-8 text-2xl">Shipping Address</h2>
			<form>
				<div class="flex flex-col gap-4">
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
			</form>
		</div>
		<div>
			<h2 class="mb-8 text-2xl">Order Summary</h2>
			<div class="max-h-[600px] overflow-auto">
				{#if data.order}
					{#each data.order.items as { product, quantity }}
						<div class="mb-4 flex gap-6 first-of-type:mt-4 last-of-type:mb-0">
							<img
								src={product.image}
								alt={product.name}
								class="h-28 w-28"
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
		</div>
	</section>
</Container>
