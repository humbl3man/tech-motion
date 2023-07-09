<script>
	import { page } from '$app/stores';
	import Container from '$lib/components/Container.svelte';
	import { Sidebar, SidebarGroup, SidebarWrapper, SidebarItem } from 'flowbite-svelte';
	import IconDashboard from '~icons/mdi/view-dashboard';
	import IconPerson from '~icons/mdi/person';
	import IconProduct from '~icons/mdi/cube-outline';
	let spanClass = 'flex-1 ml-3 whitespace-nowrap';
	$: activeUrl = $page.url.pathname;
</script>

<Container>
	<h1 class="mb-8 text-4xl font-bold">Admin Page</h1>
	<section class="flex flex-col gap-10 md:flex-row">
		<Sidebar>
			<SidebarWrapper>
				<SidebarGroup>
					<SidebarItem
						href="/admin"
						label="Dashboard"
						active={activeUrl === '/admin'}
						{spanClass}
					>
						<svelte:fragment slot="icon">
							<IconDashboard />
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem
						href="/admin/products"
						label="Manage Products"
						active={activeUrl === '/admin/products'}
						{spanClass}
					>
						<svelte:fragment slot="icon">
							<IconProduct />
						</svelte:fragment>
					</SidebarItem>
					<SidebarItem
						href="/admin/users"
						label="Manage Users"
						active={activeUrl === '/admin/users'}
						{spanClass}
					>
						<svelte:fragment slot="icon">
							<IconPerson />
						</svelte:fragment>
					</SidebarItem>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>

		<div class="grow">
			<slot />
		</div>
	</section>
</Container>
