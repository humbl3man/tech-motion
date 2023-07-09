<script lang="ts">
	import { Button, GradientButton, Input, Label, Modal, Textarea } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form: createForm, errors, enhance, submitting } = superForm(data.createForm);

	let createProductModal = false;
	$: products = data.allProducts;
</script>

<header class="mb-12">
	<h1 class="mb-4 text-2xl">Manage Products</h1>

	<GradientButton
		type="button"
		color="purpleToBlue"
		on:click={() => (createProductModal = true)}>Create new product</GradientButton
	>
</header>

<Modal
	bind:open={createProductModal}
	size="xs"
	autoclose={false}
>
	<h2 class="mb-4 text-xl dark:text-white">Create New Product</h2>
	<form
		method="post"
		action="?/create"
		class="flex flex-col space-y-4"
	>
		<Label class="space-y-2">
			<span>Name</span>
			<Input
				type="text"
				name="name"
				required
			/>
		</Label>
		<Label class="space-y-2">
			<span>Price (in cents)</span>
			<Input
				type="number"
				name="price"
				placeholder="99999"
				required
			/>
		</Label>
		<Label class="space-y-2">
			<span>Description</span>
			<Textarea
				name="description"
				rows={4}
			/>
		</Label>
		<GradientButton
			color="purpleToBlue"
			type="submit"
			class="w-full">Create</GradientButton
		>
	</form>
</Modal>

<section class="dark:text-slate-300">
	{#each products as product (product.sku)}
		<div class="flex justify-between gap-4 border-b py-6 last:border-0 dark:border-slate-400/10">
			<div class="flex gap-4">
				<div class="w-24">
					<img
						class="h-full w-full object-cover"
						src={product.image}
						alt={product.name}
					/>
				</div>
				<div>
					<p class="dark:text-white">SKU: {product.sku}</p>
					<p class="dark:text-white">Name: {product.name}</p>
				</div>
			</div>
			<!-- <div class="text-right text-sm">
				<form
					method="post"
					action="?/delete_user"
					class="mt-2"
					use:enhance={() => {
						deleteUserRecords = [...deleteUserRecords, user.email];
						return async ({ result }) => {
							await invalidateAll();
							await applyAction(result);
							deleteUserRecords = deleteUserRecords.filter((record) => !record.includes(user.email));
						};
					}}
				>
					<input
						type="hidden"
						name="user_email"
						value={user.email}
					/>
					<Button
						color="red"
						outline
						disabled={deleteUserRecords.includes(user.email)}
						size="xs"
						type="submit"
					>
						{#if deleteUserRecords.includes(user.email)}
							<Spinner
								size="3"
								class="mr-4"
							/> Deleting...
						{:else}
							Delete User
						{/if}
					</Button>
				</form>
			</div> -->
		</div>
	{/each}
</section>
