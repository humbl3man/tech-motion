<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import Navlinks from '$lib/components/Navlinks.svelte';
	import Menu from '~icons/mdi/menu';

	export let isUserLoggedIn: boolean;
	let headerHeight: number = 0;
	let menuOpen = false;

	function toggleMenuOpen() {
		menuOpen = !menuOpen;
	}

	function getHeaderHeight(element: HTMLElement) {
		headerHeight = element.clientHeight;
	}
</script>

<header
	class="group bg-indigo-100/10 py-6 backdrop-blur-md"
	use:getHeaderHeight
>
	<Container>
		<div class="flex items-center justify-between gap-4">
			<a
				href="/"
				class="font-serif text-2xl dark:text-white sm:ml-0">TechMotion</a
			>
			<!-- Desktop Links -->
			<div
				class="hidden sm:block"
				id="desktop-navigation"
			>
				<nav class="flex gap-8 px-0 py-0">
					<Navlinks {isUserLoggedIn} />
				</nav>
			</div>
			<!-- Mobile Menu Toggle -->
			<button
				type="button"
				class="dark:text-slate-50 sm:hidden"
				on:click={toggleMenuOpen}
			>
				<Menu
					class="h-8 w-8"
					aria-hidden="true"
				/>
				<span class="sr-only"> Menu </span>
			</button>
		</div>
	</Container>
</header>

<!-- Mobile Links -->
<div
	class="{menuOpen
		? ''
		: 'hidden'} fixed bottom-0 left-0 right-0 z-[999] h-full w-full bg-slate-200 px-4 py-8 dark:bg-slate-700 sm:hidden"
	style="top: {headerHeight}px"
	id="mobile-navigation"
>
	<Navlinks
		{isUserLoggedIn}
		on:click={() => (menuOpen = false)}
	/>
</div>
