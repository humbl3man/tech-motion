<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Button, Spinner, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

	import { formatDate } from '$lib/utils/formatDate';

	export let data;
	let deleteUserRecords: Array<string> = [];
	$: users = data.allUsersData;
</script>

<h1 class="mb-4 text-2xl">Manage Users</h1>

<section class="dark:text-slate-300">
	<Table shadow>
		<TableHead>
			<TableHeadCell>Email</TableHeadCell>
			<TableHeadCell>Role</TableHeadCell>
			<TableHeadCell>First Name</TableHeadCell>
			<TableHeadCell>Last Name</TableHeadCell>
			<TableHeadCell>Phone Number</TableHeadCell>
			<TableHeadCell>Created Date</TableHeadCell>
			<TableHeadCell>Updated Date</TableHeadCell>
			<TableHeadCell>Actions</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each users as user (user.email)}
				<TableBodyRow>
					<TableBodyCell>
						{user.email}
					</TableBodyCell>
					<TableBodyCell>
						{user.role.name}
					</TableBodyCell>
					<TableBodyCell>
						{user.firstName || '(NOT SET)'}
					</TableBodyCell>
					<TableBodyCell>
						{user.lastName || '(NOT SET])'}
					</TableBodyCell>
					<TableBodyCell>
						{user.phoneNumber || '(NOT SET)'}
					</TableBodyCell>
					<TableBodyCell>
						{formatDate(user.createdAt)}
					</TableBodyCell>
					<TableBodyCell>
						{formatDate(user.updatedAt)}
					</TableBodyCell>
					<TableBodyCell>
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
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</section>
