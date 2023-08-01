<script lang="ts">
	import CustomAlert from '$lib/components/CustomAlert.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { Alert, Button, Helper, Input, Label } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	export let { form: loginForm, errors, message, enhance, submitting } = superForm(data.form);
</script>

<div class="container mx-auto mt-12 max-w-md px-4">
	<h1 class="mb-8 text-4xl">Login</h1>
	{#if $message}
		<CustomAlert
			props={{
				color: 'red'
			}}
		>
			<svelte:fragment slot="title">Login Error:</svelte:fragment>
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
					placeholder="john@example.com"
					color={$errors?.email ? 'red' : 'base'}
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
			<div>
				<Button
					type="submit"
					color="blue"
					class="sm:w-1/2"
					disabled={$submitting}
				>
					{#if $submitting}
						<Loader />
						Processing...
					{:else}
						Login
					{/if}
				</Button>
			</div>
		</div>
	</form>
	<Helper class="my-6 text-sm">
		Not Registered? <a
			href="/register"
			class="link">Create Account</a
		>
	</Helper>
</div>
