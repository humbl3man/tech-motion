<script lang="ts">
	import { Button, Helper, Input, Label, Modal, Select, Spinner, Textarea } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import TrashIcon from '~icons/mdi/trash';
	import CustomAlert from '$lib/components/CustomAlert.svelte';

	export let data;

	let categoryItems = data.categories.map((cat) => ({ name: cat.name, value: cat.id }));

	const {
		form: updateForm,
		errors: updateErrors,
		enhance: updateEnhance,
		message: updateMessage,
		submitting: updateSubmitting
	} = superForm(data.updateForm);
	const {
		form: deleteForm,
		errors: deleteErrors,
		enhance: deleteEnhance,
		message: deleteMessage,
		submitting: deleteProcessing
	} = superForm(data.deleteForm, {
		onResult({ result }) {
			if (result.type === 'failure') {
				deleteModal = false;
			}
		}
	});

	let deleteModal = false;
	let selectedCategory = $updateForm.category;
</script>

<Modal
	bind:open={deleteModal}
	size="xs"
	autoclose={false}
>
	<div class="text-center">
		<svg
			aria-hidden="true"
			class="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Are you sure you want to delete <strong class="dark:text-white">&quot;{data.product.name}&quot;</strong>?
		</h3>
		<form
			method="post"
			action="?/delete"
			use:deleteEnhance
		>
			<div class="flex items-center justify-center gap-2">
				<Button
					type="submit"
					color="red"
					disabled={$deleteProcessing}
				>
					{#if $deleteProcessing}
						<Spinner
							class="mr-2"
							color="white"
							size="4"
						/>
						Deleting...
					{:else}
						Yes, Delete.
					{/if}
				</Button>
				<Button
					type="button"
					color="light"
					disabled={$deleteProcessing}
					on:click={() => (deleteModal = false)}>No, cancel</Button
				>
			</div>
		</form>
	</div>
</Modal>

<header class="mb-4">
	<h1 class="mb-4 text-2xl">Manage Product</h1>
	<Helper
		color="gray"
		helperClass="text-base"
	>
		SKU# {data.product.sku}
	</Helper>
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
			<CustomAlert
				props={{
					color: 'green'
				}}
			>
				<svelte:fragment slot="title">Success:</svelte:fragment>
				<svelte:fragment slot="message">{$updateMessage}</svelte:fragment>
			</CustomAlert>
		{/if}

		{#if $deleteMessage}
			<CustomAlert
				props={{
					color: 'red'
				}}
			>
				<svelte:fragment slot="title">Delete Error:</svelte:fragment>
				<svelte:fragment slot="message">{$deleteMessage}</svelte:fragment>
			</CustomAlert>
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
				<Helper
					color="red"
					class="mt-2 text-sm dark:text-slate-300">{$updateErrors.category[0]}</Helper
				>
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
		<div class="flex justify-end gap-2">
			<Button
				type="submit"
				color="blue"
			>
				{#if $updateSubmitting}
					<Spinner
						size="4"
						type="light"
						class="mr-2"
					/>
					Updating...
				{:else}
					Update
				{/if}
			</Button>
			<Button
				on:click={() => (deleteModal = true)}
				type="button"
				color="light"><TrashIcon class="mr-2" /> Delete</Button
			>
		</div>
	</form>
	<div class="mt-4" />
</section>
