<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Container from '$lib/components/Container.svelte';

	export let isUserLoggedIn: boolean;

	$: textColorClass = $page.url.pathname === '/' ? 'text-white' : 'text-slate-950 dark:text-slate-50';
</script>

<header class="group absolute left-0 right-0 top-0 z-10 w-full bg-indigo-100/10 py-6 backdrop-blur-md">
	<div class="absolute left-0 right-0 top-0 -z-10 h-full w-full blur-md" />
	<Container>
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<a
				href="/"
				class="ml-6 font-serif text-2xl sm:ml-0 {textColorClass}">TechMotion</a
			>
			<nav class="flex flex-col gap-8 bg-slate-100 px-6 py-4 sm:flex-row sm:gap-16 sm:bg-transparent sm:px-0 sm:py-0">
				<ul class="flex flex-col gap-4 sm:flex-row {textColorClass}">
					<li><a href="/">Home</a></li>
					<li><a href="/about">About</a></li>
					<li><a href="/products">Products</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>
				<div class="flex flex-col gap-4 sm:flex-row {textColorClass}">
					<a href="/cart">Cart</a>
					{#if isUserLoggedIn}
						<div class="flex gap-[2px]">
							<a href="/account">Account</a>
							<form
								action="/account?/logout"
								method="post"
								use:enhance={() => {
									return async ({ result }) => {
										await invalidateAll();
										await applyAction(result);
									};
								}}
							>
								(<button
									type="submit"
									class="underline">Logout</button
								>)
							</form>
						</div>
					{:else}
						<a href="/login">Login</a>
					{/if}
				</div>
			</nav>
		</div>
	</Container>
</header>
