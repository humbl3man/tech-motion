<script lang="ts">
	import { formatPrice } from '$lib/utils/formatPrice.js';
	import {
		GradientButton,
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
		Button
	} from 'flowbite-svelte';
	import {} from 'flowbite-svelte';

	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form: createForm, errors, enhance, submitting } = superForm(data.createForm);

	let createProductModal = false;
	$: products = data.allProducts;
</script>

<header class="mb-12">
	<h1 class="mb-4 text-2xl">Manage Products</h1>

	<Button
		type="button"
		color="light"
		on:click={() => (createProductModal = true)}>Create Product</Button
	>
</header>

<Modal
	bind:open={createProductModal}
	size="sm"
	autoclose={false}
>
	<h2 class="mb-2 text-xl dark:text-white">Create Product</h2>
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
		<Button
			color="blue"
			type="submit"
			class="w-full">Create</Button
		>
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
