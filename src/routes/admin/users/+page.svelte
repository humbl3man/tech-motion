<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Button, Spinner } from 'flowbite-svelte';

	import Loader from '$lib/components/Loader.svelte';
	import { formatDate } from '$lib/utils/formatDate';

	export let data;
	let deleteUserRecords: Array<string> = [];
	$: users = data.allUsersData;
</script>

<h1 class="mb-4 text-2xl">Users</h1>

<section class="dark:text-slate-300">
	{#each users as user (user.email)}
		<div class="flex justify-between gap-4 border-b py-6 last:border-0 dark:border-slate-400/10">
			<div>
				{#if user.firstName && user.lastName}
					<p class="dark:text-white">{user.firstName} {user.lastName}</p>
				{/if}
				<p class="text-sm dark:text-slate-400">{user.email}</p>
			</div>
			<div class="text-right text-sm">
				<p>Created: {formatDate(user.createdAt)}</p>
				<p>Updated: {formatDate(user.updatedAt)}</p>
				<form
					method="post"
					action="?/delete_user"
					class="mt-2"
					use:enhance={() => {
						deleteUserRecords = [...deleteUserRecords, user.email];
						return async ({ result }) => {
							await invalidateAll();
							await applyAction(result);
							deleteUserRecords = deleteUserRecords.filter((record) => !record.includes(user.email));
						};
					}}
				>
					<input
						type="hidden"
						name="user_email"
						value={user.email}
					/>
					<Button
						color="red"
						outline
						disabled={deleteUserRecords.includes(user.email)}
						size="xs"
						type="submit"
					>
						{#if deleteUserRecords.includes(user.email)}
							<Spinner
								size="3"
								class="mr-4"
							/> Deleting...
						{:else}
							Delete User
						{/if}
					</Button>
				</form>
			</div>
		</div>
	{/each}
</section>
