<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="mt-16 text-center">
	<h1 class="block text-center text-4xl font-bold">{$page.status}</h1>
	<p>{$page.error?.message}</p>
</div>
