<script lang="ts">
	import { page } from '$app/stores';
	import { formatPrice } from '$lib/utils/formatPrice.js';
	import {
		Input,
		Label,
		Modal,
		Textarea,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button,
		Spinner
	} from 'flowbite-svelte';
	import {} from 'flowbite-svelte';

	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	let createProductModal = false;

	const {
		form: createFormInstance,
		errors: createFormErrors,
		enhance: createFormEnhance,
		submitting: createFormSubmitting,
		reset: createFormReset,
		message: createFormMessage
	} = superForm(data.createForm, {
		clearOnSubmit: 'errors-and-message',
		onResult({ result, formEl }) {
			if (result.type === 'success') {
				createFormReset({
					keepMessage: false,
					data: {
						description: '',
						name: '',
						price: 0
					}
				});
				createProductModal = false;
				// TODO: show toast with success message
			}
		}
	});

	function openCreateProductModal() {
		createProductModal = true;
	}

	$: products = data.allProducts;
</script>

<header class="mb-12">
	<h1 class="mb-4 text-2xl">Manage Products</h1>

	<Button
		type="button"
		color="light"
		on:click={openCreateProductModal}>Create Product</Button
	>
</header>

<Modal
	bind:open={createProductModal}
	size="sm"
	autoclose={false}
>
	<h2 class="mb-2 text-xl dark:text-white">Create Product</h2>
	{#if $createFormMessage && $page.status !== 200}
		<p class="text-rose-500">{$createFormMessage}</p>
	{/if}
	<form
		method="post"
		action="?/create"
		class="flex flex-col space-y-4"
		use:createFormEnhance
	>
		<Label class="space-y-2">
			<span>Name</span>
			<Input
				type="text"
				name="name"
				required
			/>
			{#if $createFormErrors?.name}
				<div class="text-rose-500">{$createFormErrors.name[0]}</div>
			{/if}
		</Label>
		<Label class="space-y-2">
			<span>Price (in cents)</span>
			<Input
				type="number"
				name="price"
				placeholder="Product price in cents (for example $1 = 100 cents)"
				required
			/>
			{#if $createFormErrors?.price}
				<div class="text-rose-500">{$createFormErrors.price[0]}</div>
			{/if}
		</Label>
		<Label class="space-y-2">
			<span>Description</span>
			<Textarea
				name="description"
				rows={4}
			/>
			{#if $createFormErrors?.description}
				<div class="text-rose-500">{$createFormErrors.description[0]}</div>
			{/if}
		</Label>
		<Button
			color="blue"
			type="submit"
			disabled={$createFormSubmitting}
			class="w-full"
		>
			{#if $createFormSubmitting}
				<Spinner />
				Creating...
			{:else}
				Create
			{/if}
		</Button>
	</form>
</Modal>

<section class="dark:text-slate-300">
	<Table shadow>
		<TableHead>
			<TableHeadCell>SKU</TableHeadCell>
			<TableHeadCell>Product Name</TableHeadCell>
			<TableHeadCell>Price</TableHeadCell>
			<TableHeadCell />
			<TableHeadCell />
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each products as product (product.sku)}
				<TableBodyRow>
					<TableBodyCell>
						{product.sku}
					</TableBodyCell>
					<TableBodyCell>
						{product.name}
					</TableBodyCell>
					<TableBodyCell>
						{formatPrice(product.price)}
					</TableBodyCell>
					<TableBodyCell>
						<form
							method="post"
							action="?/update"
						>
							<Button
								size="xs"
								type="button"
								outline
								color="primary">Update</Button
							>
						</form>
					</TableBodyCell>
					<TableBodyCell>
						<form
							method="post"
							action="?/delete"
						>
							<Button
								size="xs"
								type="button"
								outline
								color="red">Delete</Button
							>
						</form>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</section>