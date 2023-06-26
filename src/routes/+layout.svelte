<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import '../app.css';
	import Navbar from './Navbar.svelte';

	export let data;
	$: ({ user } = data);
	$: isUserLoggedIn = Boolean(user);
</script>

<svelte:head>
	<link
		rel="preconnect"
		href="https://fonts.googleapis.com"
	/>
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<Navbar {isUserLoggedIn} />
<main>
	<slot />
</main>
