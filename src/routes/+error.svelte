<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="mt-16 text-center">
	{#if $page.status === 500}
		<h1 class="text-[90px] font-bold dark:text-indigo-400">{$page.status}</h1>
		<p class="mb-4 text-3xl dark:text-slate-50">Internal Server error.</p>
		<p class="text-slate-200 dark:text-slate-400">We are working on it...</p>
	{:else}
		<h1 class="text-[90px] font-bold dark:text-indigo-400">{$page.status}</h1>
		<p class="mb-10 text-3xl dark:text-slate-50">Whoops! That page doesn't exist.</p>
		{#if $page.status === 404}
			<a
				href="/"
				class="btn">Go to homepage</a
			>
		{/if}
	{/if}
</div>
