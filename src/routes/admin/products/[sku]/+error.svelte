<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.status === 404}
	<h1 class="mb-4 text-2xl">{$page.error?.message ?? 'Product Not Found'}</h1>
{:else}
	<h1 class="mb-4 text-2xl">Internal Error</h1>
{/if}
