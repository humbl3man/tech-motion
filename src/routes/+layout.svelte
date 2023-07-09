<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';

	export let data;
	$: ({ user } = data);
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
		href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@600;800&display=swap"
		rel="stylesheet"
	/>
	<title>TechMotion</title>
</svelte:head>
<Navbar />
<main class="my-12">
	<slot />
</main>
