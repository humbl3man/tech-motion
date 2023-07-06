<script lang="ts">
	import { applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Loader from '$lib/components/Loader.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	export let {
		form: loginForm,
		errors,
		message,
		enhance,
		submitting
	} = superForm(data.form, {
		taintedMessage: 'Are you sure you want to leave?'
	});
</script>

<div class="container mx-auto mt-12 max-w-md px-4">
	<h1 class="mb-8 text-4xl">Login</h1>
	<form
		method="post"
		use:enhance
	>
		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<label for="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					class="input block w-full"
					placeholder="john@example.com"
					required
				/>
				{#if $errors?.email}
					<p class="text-rose-500">{$errors.email[0]}</p>
				{/if}
			</div>
			<div class="flex flex-col gap-2">
				<label for="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					class="input block w-full"
					required
				/>
				{#if $errors?.password}
					<p class="text-rose-500">{$errors.password[0]}</p>
				{/if}
			</div>
			{#if $message}
				<div class="text-rose-500">{$message}</div>
			{/if}
			<div>
				<button
					type="submit"
					class="btn w-full sm:w-1/2"
					disabled={$submitting}
				>
					{#if $submitting}
						<Loader />
						Processing...
					{:else}
						Login
					{/if}
				</button>
			</div>
		</div>
	</form>
	<p class="mt-6">
		Not Registered? <a
			href="/register"
			class="link">Create Account</a
		>
	</p>
</div>
