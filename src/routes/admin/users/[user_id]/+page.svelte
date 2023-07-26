<script lang="ts">
	import { getRoleName } from '$lib/utils/getRoleName.js';
	import { Alert, Button, Helper, Input, Label, Modal, Spinner } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';

	import TrashIcon from '~icons/mdi/trash';

	export let data;

	const {
		form: updateUserForm,
		errors: updateUserErrors,
		submitting: updateUserSubmitting,
		enhance: updateUserEnhance,
		message: updateUserMessage
	} = superForm(data.updateUserForm);

	const {
		form: deleteUserForm,
		enhance: deleteUserEnhance,
		message: deleteMessage,
		submitting: deleteProcessing
	} = superForm(data.deleteUserForm, {
		onResult({ result }) {
			if (result.type === 'failure') {
				deleteModal = false;
			}
		}
	});

	let deleteModal = false;

	// cannot delete yourself.
	$: showDeleteButton = data.user.email !== data.userProfile.email;
</script>

{#if showDeleteButton}
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
				Are you sure you want to delete <strong class="dark:text-white">&quot;{data.userProfile.email}&quot;</strong>?
			</h3>
			<Alert color="yellow">If they have items in cart, it will be deleted too.</Alert>
			<form
				method="post"
				action="?/delete"
				use:deleteUserEnhance
			>
				<input
					type="hidden"
					name="id"
					bind:value={$deleteUserForm.id}
				/>
				<input
					type="hidden"
					name="email"
					bind:value={$deleteUserForm.email}
				/>
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
{/if}

<header class="mb-8">
	<h1 class="mb-4 text-2xl">Manage User - {data.userProfile.email}</h1>
	<p>Role: {getRoleName(data.userProfile.roleId)}</p>
</header>

<section>
	<form
		method="post"
		action="?/update"
		class="flex max-w-screen-sm flex-col space-y-6"
		use:updateUserEnhance
	>
		<!-- Feedback Messages -->
		{#if $updateUserMessage}
			<Alert color="green">
				<span class="font-bold">Success!</span>
				{$updateUserMessage}
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
				for="firstName"
				color={$updateUserErrors?.firstName ? 'red' : 'gray'}
				class="mb-2 text-base">First Name:</Label
			>
			<Input
				type="text"
				name="firstName"
				id="firstName"
				color={$updateUserErrors?.firstName ? 'red' : 'base'}
				bind:value={$updateUserForm.firstName}
			/>
			{#if $updateUserErrors?.firstName}
				<Helper
					color="red"
					class="mt-2">{$updateUserErrors.firstName[0]}</Helper
				>
			{/if}
		</div>
		<div>
			<Label
				for="lastName"
				color={$updateUserErrors?.lastName ? 'red' : 'gray'}
				class="mb-2 text-base">Last Name:</Label
			>
			<Input
				type="text"
				name="lastName"
				id="lastName"
				color={$updateUserErrors?.lastName ? 'red' : 'base'}
				bind:value={$updateUserForm.lastName}
			/>
			{#if $updateUserErrors?.lastName}
				<Helper
					color="red"
					class="mt-2">{$updateUserErrors.lastName[0]}</Helper
				>
			{/if}
		</div>
		<div>
			<Label
				for="phoneNumber"
				color={$updateUserErrors?.phoneNumber ? 'red' : 'gray'}
				class="mb-2 text-base">Phone Number:</Label
			>
			<Input
				type="text"
				name="phoneNumber"
				id="phoneNumber"
				color={$updateUserErrors?.phoneNumber ? 'red' : 'base'}
				bind:value={$updateUserForm.phoneNumber}
			/>
			{#if $updateUserErrors?.phoneNumber}
				<Helper
					color="red"
					class="mt-2">{$updateUserErrors.phoneNumber[0]}</Helper
				>
			{/if}
		</div>
		<div class="flex justify-end gap-2">
			<Button
				type="submit"
				color="blue"
			>
				{#if $updateUserSubmitting}
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
			{#if showDeleteButton}
				<Button
					on:click={() => (deleteModal = true)}
					type="button"
					color="light"><TrashIcon class="mr-2" /> Delete</Button
				>
			{/if}
		</div>
	</form>
</section>
