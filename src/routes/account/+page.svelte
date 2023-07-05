<script>
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
</script>

<div class="container mx-auto">
	<h1 class="text-4xl">Account Page</h1>
	<form
		action="?/logout"
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
			class="underline dark:text-slate-300">Logout</button
		>)
	</form>
</div>
