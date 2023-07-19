<script lang="ts">
	import { Alert, Button, Helper, Input, Label, Select, Textarea } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	let { product } = data;
	let categoryItems = data.categories.map((cat) => ({ name: cat.name, value: cat.id }));
	let selectedCategory = data.product.categories[0]?.id || null;

	const { form: updateForm, errors, enhance, message } = superForm(data.productForm);
	$: console.log($message);
</script>

<header class="mb-12">
	<h1 class="mb-4 text-2xl">Manage Product</h1>
</header>

<section>
	<form
		method="post"
		action="?/update"
		class="flex max-w-screen-sm flex-col space-y-6"
		use:enhance
	>
		<input
			type="hidden"
			name="sku"
			bind:value={$updateForm.sku}
		/>

		{#if $message}
			<Alert color="green">
				<span class="font-bold">Success!</span>
				{$message}
			</Alert>
		{/if}

		<div>
			<Label
				for="name"
				color={$errors?.name ? 'red' : 'gray'}
				class="mb-2 text-base">Product Name:</Label
			>
			<Input
				type="text"
				name="name"
				id="name"
				color={$errors?.name ? 'red' : 'base'}
				bind:value={$updateForm.name}
				required
			/>
			{#if $errors?.name}
				<Helper
					color="red"
					class="mt-2">{$errors.name[0]}</Helper
				>
			{/if}
		</div>
		<div>
			<Label
				for="price"
				class="mb-2 text-base"
				color={$errors?.price ? 'red' : 'gray'}>Product Price:</Label
			>
			<Input
				type="number"
				name="price"
				id="price"
				color={$errors?.price ? 'red' : 'base'}
				bind:value={$updateForm.price}
			/>
			{#if $errors?.price}
				<Helper
					color="red"
					class="mt-2">{$errors.price[0]}</Helper
				>
			{:else}
				<Helper class="mt-2 text-sm dark:text-slate-300">Provide value in cents (number only)</Helper>
			{/if}
		</div>
		<div>
			<Label
				for="category"
				class="mb-2 text-base">Product Category:</Label
			>
			<Select
				id="category"
				name="category"
				items={categoryItems}
				bind:value={selectedCategory}
				placeholder="Choose Category..."
			/>
		</div>
		<div>
			<Label
				for="description"
				class="mb-2 text-base">Product Description:</Label
			>
			<Textarea
				name="description"
				id="description"
				placeholder="Add Description.."
				rows={5}
				bind:value={$updateForm.description}
			/>
		</div>
		<div>
			<Button
				type="submit"
				color="blue">Update</Button
			>
		</div>
	</form>
</section>
