<script lang="ts">
	import { Card } from 'flowbite-svelte';

	export let data;
	$: ({ userCount, productCount } = data);
</script>

<section class="grid grid-flow-row gap-2 lg:grid-flow-col">
	<Card size="lg">
		<h2>Number of users</h2>
		<p>{userCount}</p>
	</Card>
	<Card size="lg">
		<h2>Number of products</h2>
		<p>{productCount}</p>
	</Card>
</section>
