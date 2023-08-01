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
		Spinner,
		Toast,
		Select,
		Helper,
		Alert
	} from 'flowbite-svelte';

	import { superForm } from 'sveltekit-superforms/client';
	import CheckIcon from '~icons/mdi/check';

	export let data;

	let createProductModal = false;
	let showCreateProductSuccessToast = false;

	const {
		errors: createProductErrors,
		enhance: createProductEnhance,
		submitting: createProductProcessing,
		reset: createProductReset,
		message: createProductMessage
	} = superForm(data.createForm, {
		onResult({ result }) {
			if (result.type === 'success') {
				createProductReset({
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

	let categoryItems = data.categoryList.map((cat) => ({ name: cat.name, value: cat.id }));
	let selectedCategory: string;
</script>

<header class="mb-12">
	<h1 class="mb-4 text-2xl">Manage Products</h1>

	<Button
		type="button"
		color="light"
		on:click={openCreateProductModal}>Create Product</Button
	>
</header>

{#if showCreateProductSuccessToast && $createProductMessage && $page.status === 200}
	<div class="fixed bottom-4 right-4 z-[9999] w-full px-4">
		<Toast
			color="green"
			position="bottom-right"
			contentClass="dark:text-white w-full"
		>
			<svelte:fragment slot="icon">
				<CheckIcon />
			</svelte:fragment>
			{$createProductMessage}
		</Toast>
	</div>
{/if}

<!-- Begin Product Create Modal -->
<Modal
	bind:open={createProductModal}
	size="sm"
	autoclose={false}
>
	<h2 class="mb-2 text-xl dark:text-white">Create Product</h2>
	{#if $createProductMessage && $page.status !== 200}
		<Alert
			class="text-base"
			color="red">{$createProductMessage}</Alert
		>
	{/if}
	<form
		method="post"
		action="?/create"
		class="flex flex-col space-y-4"
		use:createProductEnhance
	>
		<Label class="space-y-2">
			<span>Name</span>
			<Input
				type="text"
				name="name"
			/>
			{#if $createProductErrors?.name}
				<Helper
					class="mt-2 text-sm"
					color="red">{$createProductErrors.name[0]}</Helper
				>
			{/if}
		</Label>
		<Label class="space-y-2">
			<span>Price (in cents)</span>
			<Input
				type="number"
				name="price"
				placeholder="Product price in cents (for example $1 = 100 cents)"
			/>
			{#if $createProductErrors?.price}
				<Helper
					class="mt-2 text-sm"
					color="red">{$createProductErrors.price[0]}</Helper
				>
			{/if}
		</Label>
		<Label class="space-y-2">
			<span>Primary Category</span>
			<Select
				items={categoryItems}
				bind:value={selectedCategory}
				name="category"
				placeholder="Choose Category..."
			/>
		</Label>
		{#if $createProductErrors?.category}
			<Helper
				class="mt-2 text-sm"
				color="red">{$createProductErrors.category[0]}</Helper
			>
		{/if}
		<Label class="space-y-2">
			<span>Description</span>
			<Textarea
				name="description"
				rows={4}
			/>
			{#if $createProductErrors?.description}
				<Helper
					class="mt-2 text-sm"
					color="red">{$createProductErrors.description[0]}</Helper
				>
			{/if}
		</Label>
		<Button
			color="blue"
			type="submit"
			disabled={$createProductProcessing}
			class="w-full"
		>
			{#if $createProductProcessing}
				<Spinner />
				Creating...
			{:else}
				Create
			{/if}
		</Button>
	</form>
</Modal>
<!-- End Product Create Modal -->

<section class="dark:text-slate-300">
	<Table shadow>
		<TableHead>
			<TableHeadCell>SKU</TableHeadCell>
			<TableHeadCell>Product Name</TableHeadCell>
			<TableHeadCell>Price</TableHeadCell>
			<TableHeadCell>Categories</TableHeadCell>
			<TableHeadCell />
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each data.products as product (product.sku)}
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
						<Button
							href="/admin/products/{product.sku}"
							size="xs"
							type="button"
							outline
							color="primary">Edit</Button
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</section>
