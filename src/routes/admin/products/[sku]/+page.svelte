<script lang="ts">
	import { Alert, Button, Helper, Input, Label, Select, Spinner, Textarea } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	let { product } = data;
	let categoryItems = data.categories.map((cat) => ({ name: cat.name, value: cat.id }));
	let selectedCategory = data.product.categories[0]?.id || null;

	const { form: updateForm, errors: updateErrors, enhance: updateEnhance, message: updateMessage } = superForm(data.updateForm);
	const {
		form: deleteForm,
		errors: deleteErrors,
		enhance: deleteEnhance,
		message: deleteMessage,
		submitting: deleteProcessing
	} = superForm(data.deleteForm);
</script>

<header class="mb-12">
	<h1 class="mb-4 text-2xl">Manage Product</h1>
</header>

<section>
	<form
		method="post"
		action="?/update"
		class="flex max-w-screen-sm flex-col space-y-6"
		use:updateEnhance
	>
		<input
			type="hidden"
			name="sku"
			bind:value={$updateForm.sku}
		/>

		<!-- Feedback Messages -->
		{#if $updateMessage}
			<Alert color="green">
				<span class="font-bold">Success!</span>
				{$updateMessage}
			</Alert>
		{/if}

		{#if $deleteMessage}
			<Alert color="red">
				<span class="font-bold">Error</span>
				{$deleteMessage}
			</Alert>
		{/if}

		<div>
			<Label
				for="name"
				color={$updateErrors?.name ? 'red' : 'gray'}
				class="mb-2 text-base">Product Name:</Label
			>
			<Input
				type="text"
				name="name"
				id="name"
				color={$updateErrors?.name ? 'red' : 'base'}
				bind:value={$updateForm.name}
				required
			/>
			{#if $updateErrors?.name}
				<Helper
					color="red"
					class="mt-2">{$updateErrors.name[0]}</Helper
				>
			{/if}
		</div>
		<div>
			<Label
				for="price"
				class="mb-2 text-base"
				color={$updateErrors?.price ? 'red' : 'gray'}>Product Price:</Label
			>
			<Input
				type="number"
				name="price"
				id="price"
				color={$updateErrors?.price ? 'red' : 'base'}
				bind:value={$updateForm.price}
			/>
			{#if $updateErrors?.price}
				<Helper
					color="red"
					class="mt-2">{$updateErrors.price[0]}</Helper
				>
			{:else}
				<Helper class="mt-2 text-sm dark:text-slate-300">Provide value in cents (number only)</Helper>
			{/if}
		</div>
		<div>
			<Label
				for="category"
				class="mb-2 text-base"
				color={$updateErrors?.category ? 'red' : 'gray'}>Product Category:</Label
			>
			<Select
				id="category"
				name="category"
				items={categoryItems}
				color={$updateErrors?.category ? 'red' : 'base'}
				bind:value={selectedCategory}
				placeholder="Choose Category..."
			/>
			{#if $updateErrors?.category}
				<Helper class="mt-2 text-sm dark:text-slate-300">{$updateErrors.category[0]}</Helper>
			{/if}
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
	<div class="mt-4">
		<form
			method="post"
			action="?/delete"
			use:deleteEnhance
		>
			<Button
				type="submit"
				color="red"
			>
				{#if $deleteProcessing}
					<Spinner
						class="mr-2"
						color="white"
					/>
					Deleting...
				{:else}
					Delete This Product
				{/if}
			</Button>
		</form>
	</div>
</section>
