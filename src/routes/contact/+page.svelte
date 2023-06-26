<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	export let { form: contactForm, errors, message } = superForm(data.form);

	let isProcesing = false;
</script>

<div class="container mx-auto mt-12 max-w-md px-4">
	<h1 class="mb-8 text-4xl">Contact Us</h1>
	{#if $message}
		<div class="mb-4 text-sm text-green-600">{$message}</div>
	{:else}
		<form
			method="post"
			use:enhance={() => {
				isProcesing = true;
				return async ({ result }) => {
					await invalidateAll();
					await applyAction(result);
					isProcesing = false;
				};
			}}
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
					<label for="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						class="input block w-full"
						placeholder="John Doe"
						required
					/>
					{#if $errors?.name}
						<p class="text-rose-500">{$errors.name[0]}</p>
					{/if}
				</div>
				<div class="flex flex-col gap-2">
					<label for="message">Message</label>
					<textarea
						name="message"
						id="message"
						class="input block w-full"
						rows={5}
						required
					/>
					{#if $errors?.message}
						<p class="text-rose-500">{$errors.message[0]}</p>
					{/if}
				</div>
				<div>
					<button
						type="submit"
						class="btn w-full sm:w-1/2"
						disabled={isProcesing}>Send Email</button
					>
				</div>
			</div>
		</form>
	{/if}
</div>
