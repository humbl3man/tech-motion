<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import CustomAlert from '$lib/components/CustomAlert.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { Button, Helper, Input, Label } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import ExitIcon from '~icons/mdi/exit-to-app';

	export let data;
	const { form: accountForm, errors, message, enhance: accountFormEnhance, submitting } = superForm(data.form);
</script>

<div class="container mx-auto max-w-xl px-4">
	<header class="mb-10 flex items-center justify-between">
		<h1 class="text-2xl">Account Information</h1>
		<form
			action="?/logout"
			method="post"
			use:enhance={() => {
				return async ({ result }) => {
					await invalidateAll();
					await applyAction(result);
				};
			}}
		>
			<button
				type="submit"
				class="btn btn-alt btn-sm btn-with-icon"
			>
				<span>Logout</span>
				<ExitIcon />
			</button>
		</form>
	</header>

	{#if $message}
		<CustomAlert
			props={{
				color: 'green'
			}}
		>
			<svelte:fragment slot="title">Success!</svelte:fragment>
			<svelte:fragment slot="message">{$message}</svelte:fragment>
		</CustomAlert>
	{/if}

	<form
		method="post"
		action="?/update"
		use:accountFormEnhance
	>
		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<Label for="email">Email</Label>
				<Input
					id="email"
					disabled
					value={data.user.email}
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<div class="flex w-full flex-col gap-2 sm:w-1/2">
					<Label for="firstName">First Name</Label>
					<Input
						type="text"
						name="firstName"
						id="firstName"
						color={$errors?.firstName ? 'red' : 'base'}
						bind:value={$accountForm.firstName}
					/>
					{#if $errors?.firstName}
						<Helper color="red">{$errors.firstName[0]}</Helper>
					{/if}
				</div>
				<div class="flex w-full flex-col gap-2 sm:w-1/2">
					<Label for="lastName">Last Name</Label>
					<Input
						type="text"
						name="lastName"
						id="lastName"
						color={$errors?.lastName ? 'red' : 'base'}
						bind:value={$accountForm.lastName}
					/>
					{#if $errors?.lastName}
						<Helper color="red">{$errors.lastName[0]}</Helper>
					{/if}
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<label for="phoneNumber">Phone Number</label>
				<Input
					type="text"
					name="phoneNumber"
					id="phoneNumber"
					color={$errors?.phoneNumber ? 'red' : 'base'}
					placeholder="(555) 555 - 1234"
					bind:value={$accountForm.phoneNumber}
				/>
				{#if $errors?.phoneNumber}
					<Helper color="red">{$errors.phoneNumber[0]}</Helper>
				{/if}
				<Helper>Example: (555) - 555 - 1234</Helper>
			</div>
			<div class="flex flex-row gap-2">
				<Button
					type="submit"
					class="sm:w-1/2"
					color="blue"
					disabled={$submitting}
				>
					{#if $submitting}
						<Loader />
						Updating...
					{:else}
						Update Account
					{/if}
				</Button>
			</div>
		</div>
	</form>
</div>
