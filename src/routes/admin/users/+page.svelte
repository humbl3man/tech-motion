<script lang="ts">
	import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

	import { formatDate } from '$lib/utils/formatDate';

	export let data;
	$: users = data.allUsersData;
</script>

<h1 class="mb-4 text-2xl">Manage Users</h1>

<section class="dark:text-slate-300">
	<Table shadow>
		<TableHead>
			<TableHeadCell>Id</TableHeadCell>
			<TableHeadCell>Email</TableHeadCell>
			<TableHeadCell>Role</TableHeadCell>
			<TableHeadCell>First Name</TableHeadCell>
			<TableHeadCell>Last Name</TableHeadCell>
			<TableHeadCell>Phone Number</TableHeadCell>
			<TableHeadCell>Created Date</TableHeadCell>
			<TableHeadCell>Updated Date</TableHeadCell>
			<TableHeadCell />
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each users as user (user.email)}
				<TableBodyRow>
					<TableBodyCell>
						{user.id}
					</TableBodyCell>
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
						<Button
							color="light"
							size="sm"
							href="/admin/users/{user.id}">Edit</Button
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</section>
