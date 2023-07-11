<script lang="ts">
	import type { Product } from '$lib/types';
	import { Button } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let form;
	export let product: Product;

	const { errors, enhance, submitting } = superForm(form);
	$: console.log($errors);
</script>

<form
	method="post"
	action="?/delete_product"
	use:enhance
>
	<input
		type="hidden"
		name="sku"
		value={product.sku}
	/>
	<Button
		size="xs"
		type="submit"
		outline
		disabled={$submitting}
		color="red"
	>
		{#if $submitting}
			Deleting...
		{:else}
			Delete
		{/if}
	</Button>
</form>
