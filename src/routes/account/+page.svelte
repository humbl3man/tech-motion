<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import ExitIcon from '~icons/mdi/exit-to-app';

	export let data;
	let isProcesing = false;
</script>

<div class="container mx-auto max-w-lg px-4">
	<header class="mb-10 flex items-center justify-between">
		<h1>Account</h1>
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

	<form
		method="post"
		action="?/update"
	>
		<div class="flex flex-col gap-6">
			<div class="flex flex-col gap-2">
				<label for="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					class="input block w-full"
					readonly
					value={data.user.email}
				/>
				<!-- {#if $errors?.email}
					<p class="text-rose-500">{$errors.email[0]}</p>
				{/if} -->
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<div class="flex w-full flex-col gap-2 sm:w-1/2">
					<label for="firstName">First Name</label>
					<input
						type="text"
						name="firstName"
						id="firstName"
						class="input block w-full"
						placeholder="John"
					/>
				</div>
				<div class="flex w-full flex-col gap-2 sm:w-1/2">
					<label for="lastName">Last Name</label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						class="input block w-full"
						placeholder="Doe"
					/>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<label for="phoneNumber">Phone Number</label>
				<input
					type="text"
					name="phoneNumber"
					id="phoneNumber"
					class="input block w-full"
					placeholder="123-345-6789"
				/>
			</div>
			<div class="flex flex-row gap-2">
				<button
					type="submit"
					class="btn w-full sm:w-1/2"
					disabled={isProcesing}>Update Account</button
				>
			</div>
		</div>
	</form>
</div>
