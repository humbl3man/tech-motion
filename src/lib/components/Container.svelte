<script lang="ts">
	export let size: 'small' | 'normal' | 'wide' = 'normal';

	function getSizeClass(s: typeof size) {
		switch (s) {
			case 'small':
				return 'max-w-screen-lg';
			case 'normal':
				return 'max-w-screen-xl';
			case 'wide':
				return 'max-w-screen-2xl';
			default:
				return s;
		}
	}

	$: sizeClass = getSizeClass(size);
</script>

<div class="container mx-auto px-4 {sizeClass}">
	<slot />
</div>
