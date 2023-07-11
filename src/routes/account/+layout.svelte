<script lang="ts">
	import { page } from '$app/stores';
	import Container from '$lib/components/Container.svelte';
	import { Sidebar, SidebarGroup, SidebarWrapper, SidebarItem } from 'flowbite-svelte';
	import IconPerson from '~icons/mdi/person';
	import IconGear from '~icons/mdi/gear';
	import { Role } from '$lib/constants/Role.js';

	export let data;

	let spanClass = 'flex-1 ml-3 whitespace-nowrap';
	$: activeUrl = $page.url.pathname;
	$: isAdmin = data.user.role === Role.ADMIN;
</script>

<Container>
	<section class="flex flex-col gap-10 md:flex-row">
		<Sidebar>
			<SidebarWrapper>
				<SidebarGroup>
					<SidebarItem
						href="/account"
						label="Profile"
						active={activeUrl === '/account'}
						{spanClass}
					>
						<svelte:fragment slot="icon">
							<IconPerson />
						</svelte:fragment>
					</SidebarItem>
					{#if isAdmin}
						<SidebarItem
							href="/admin"
							label="Admin"
							{spanClass}
						>
							<svelte:fragment slot="icon">
								<IconGear />
							</svelte:fragment>
						</SidebarItem>
					{/if}
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>

		<div class="grow">
			<slot />
		</div>
	</section>
</Container>
