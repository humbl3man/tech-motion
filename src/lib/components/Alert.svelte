<script lang="ts">
	export let type: 'normal' | 'success' | 'error' = 'normal';

	function getAlertVariantClass(t: string) {
		switch (t) {
			case 'error':
				return 'alert-error';
			case 'success':
				return 'alert-success';
			case 'normal':
			default:
				return '';
		}
	}

	$: alertClass = getAlertVariantClass(type);
</script>

<div
	class="alert {alertClass}"
	role="alert"
>
	<span class="font-bold">
		<slot name="title" />
	</span>
	<slot name="message" />
</div>
