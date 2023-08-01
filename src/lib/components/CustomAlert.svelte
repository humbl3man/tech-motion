<script lang="ts">
	import { Alert } from 'flowbite-svelte';
	import type { AlertProps } from 'flowbite-svelte/dist/alerts/Alert.svelte';

	export let props: AlertProps;
</script>

<Alert
	{...props}
	class="my-4 rounded-none border-l-4"
>
	<span class="font-bold">
		<slot name="title" />
	</span>
	<slot name="message" />
</Alert>
