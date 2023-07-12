<script lang="ts">
	import { page } from '$app/stores';
	import ProductDeleteForm from '$lib/components/admin/ProductDeleteForm.svelte';
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
		Spinner,
		Toast
	} from 'flowbite-svelte';

	import { superForm } from 'sveltekit-superforms/client';
	import CheckIcon from '~icons/mdi/check';

	export let data;

	let createProductModal = false;
	let showCreateProductSuccessToast = false;

	const {
		form: createFormInstance,
		errors: createFormErrors,
		enhance: createFormEnhance,
		submitting: createFormSubmitting,
		reset: createFormReset,
		message: createFormMessage
	} = superForm(data.createForm, {
		clearOnSubmit: 'errors-and-message',
		onResult({ result }) {
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
				showCreateProductSuccessToast = true;
				window.setTimeout(() => {
					showCreateProductSuccessToast = false;
				}, 10000);
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

{#if showCreateProductSuccessToast && $createFormMessage && $page.status === 200}
	<div class="fixed bottom-4 right-4 z-[9999] w-full px-4">
		<Toast
			color="green"
			position="bottom-right"
			contentClass="dark:text-white w-full"
		>
			<svelte:fragment slot="icon">
				<CheckIcon />
			</svelte:fragment>
			{$createFormMessage}
		</Toast>
	</div>
{/if}

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
			<TableHeadCell>Categories</TableHeadCell>
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
						{#if product.categories?.length}
							{product.categories.map((c) => c.name).join(',')}
						{/if}
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
						<ProductDeleteForm
							{product}
							form={data.deleteForms.find((f) => f.id === product.sku.toString())}
						/>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</section>
