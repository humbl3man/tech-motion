<script>
	import { page } from '$app/stores';
	import Container from '$lib/components/Container.svelte';
</script>

<Container>
	<h1 class="mb-8 text-4xl font-bold">Admin Page</h1>
	<section class="flex flex-col gap-10 md:flex-row">
		<aside class="grow-0 rounded-md bg-slate-200 px-6 py-8 shadow-sm dark:bg-slate-700">
			<ul>
				<li>
					<a
						href="/admin/users"
						class="block w-full p-3 dark:hover:bg-slate-600 {$page.route.id === '/admin/users'
							? 'text-indigo-800 dark:text-indigo-300'
							: ''}">Manage Users</a
					>
				</li>
				<li class="border-t dark:border-slate-400/25">
					<a
						href="/admin/products"
						class="block w-full p-3 dark:hover:bg-slate-600 {$page.route.id === '/admin/products'
							? 'text-indigo-800 dark:text-indigo-300'
							: ''}">Manage Products</a
					>
				</li>
			</ul>
		</aside>
		<div class="grow">
			<slot />
		</div>
	</section>
</Container>
