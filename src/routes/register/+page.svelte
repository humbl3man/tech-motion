<script lang="ts">
	import CustomAlert from '$lib/components/CustomAlert.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { Button, Helper, Input, Label } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	export let { form: loginForm, errors, message, enhance, submitting } = superForm(data.form);
</script>

<div class="container mx-auto mt-12 max-w-md px-4">
	<h1 class="mb-8 text-4xl">Register</h1>
	{#if $message}
		<CustomAlert
			props={{
				color: 'red'
			}}
		>
			<svelte:fragment slot="title">Registration Error:</svelte:fragment>
			<svelte:fragment slot="message">{$message}</svelte:fragment>
		</CustomAlert>
	{/if}
	<form
		method="post"
		use:enhance
	>
		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<Label for="email">Email</Label>
				<Input
					type="email"
					name="email"
					id="email"
					color={$errors?.email ? 'red' : 'base'}
					placeholder="john@example.com"
					required
				/>
				{#if $errors?.email}
					<Helper color="red">{$errors.email[0]}</Helper>
				{/if}
			</div>
			<div class="flex flex-col gap-2">
				<Label for="password">Password</Label>
				<Input
					type="password"
					name="password"
					id="password"
					color={$errors?.password ? 'red' : 'base'}
					required
				/>
				{#if $errors?.password}
					<Helper color="red">{$errors.password[0]}</Helper>
				{/if}
			</div>
			<div class="flex flex-col gap-2">
				<Label for="passwordConfirmation">Confirm password</Label>
				<Input
					type="password"
					name="passwordConfirmation"
					id="passwordConfirmation"
					color={$errors?.passwordConfirmation ? 'red' : 'base'}
					required
				/>
				{#if $errors?.passwordConfirmation}
					<Helper color="red">{$errors.passwordConfirmation[0]}</Helper>
				{/if}
			</div>
			<div>
				<Button
					type="submit"
					color="blue"
					disabled={$submitting}
				>
					{#if $submitting}
						<Loader />
						Processing...
					{:else}
						Create Account
					{/if}
				</Button>
			</div>
		</div>
	</form>
	<Helper class="my-6 text-base">
		Already have account? <a
			href="/login"
			class="link">Sign In</a
		>
	</Helper>
</div>
