<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Alert from '$lib/components/Alert.svelte';
	import Loader from '$lib/components/Loader.svelte';
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
		<Alert type="success">
			<svelte:fragment slot="title">Success!</svelte:fragment>
			<svelte:fragment slot="message">{$message}</svelte:fragment>
		</Alert>
	{/if}

	<form
		method="post"
		action="?/update"
		use:accountFormEnhance
	>
		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<label for="email">Email</label>
				<input
					id="email"
					class="input block w-full"
					readonly
					value={data.user.email}
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<div class="flex w-full flex-col gap-2 sm:w-1/2">
					<label for="firstName">First Name</label>
					<input
						type="text"
						name="firstName"
						id="firstName"
						class="input block w-full"
						bind:value={$accountForm.firstName}
					/>
					{#if $errors?.firstName}
						<p class="text-rose-500">{$errors.firstName[0]}</p>
					{/if}
				</div>
				<div class="flex w-full flex-col gap-2 sm:w-1/2">
					<label for="lastName">Last Name</label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						class="input block w-full"
						bind:value={$accountForm.lastName}
					/>
					{#if $errors?.lastName}
						<p class="text-rose-500">{$errors.lastName[0]}</p>
					{/if}
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<label for="phoneNumber">Phone Number</label>
				<input
					type="text"
					name="phoneNumber"
					id="phoneNumber"
					class="input block w-full"
					bind:value={$accountForm.phoneNumber}
				/>
				{#if $errors?.phoneNumber}
					<p class="text-rose-500">{$errors.phoneNumber[0]}</p>
				{/if}
			</div>
			<div class="flex flex-row gap-2">
				<button
					type="submit"
					class="btn w-full sm:w-1/2"
					disabled={$submitting}
				>
					{#if $submitting}
						<Loader />
						Updating...
					{:else}
						Update Account
					{/if}
				</button>
			</div>
		</div>
	</form>
</div>
