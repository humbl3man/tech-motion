<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import IconCart from '~icons/mdi/cart';

	export let isUserLoggedIn: boolean;

	const dispatch = createEventDispatcher();

	function clickHandler() {
		dispatch('click');
	}
	$: ({ cartCount } = $page.data);
	$: console.log(cartCount);
</script>

<ul class="flex flex-col gap-4 dark:text-slate-300 sm:flex-row">
	<li>
		<a
			href="/"
			class="block w-full p-1 sm:inline-block sm:w-auto sm:p-0"
			on:click={clickHandler}>Home</a
		>
	</li>
	<li>
		<a
			href="/about"
			class="block w-full p-1 sm:inline-block sm:w-auto sm:p-0"
			on:click={clickHandler}>About</a
		>
	</li>
	<li>
		<a
			href="/products"
			class="block w-full p-1 sm:inline-block sm:w-auto sm:p-0"
			on:click={clickHandler}>Products</a
		>
	</li>
	<li>
		<a
			href="/contact"
			class="block w-full p-1 sm:inline-block sm:w-auto sm:p-0"
			on:click={clickHandler}>Contact</a
		>
	</li>
	<div class="flex flex-col gap-4 sm:flex-row">
		{#if isUserLoggedIn}
			<li>
				<a
					href="/cart"
					class="block w-full p-1 sm:inline-block sm:w-auto sm:p-0"
					on:click={clickHandler}
				>
					<div class="relative">
						<IconCart
							class="text-[22px]"
							aria-hidden="true"
						/>
						<span
							class="absolute bottom-0 right-[-4px] inline-flex h-[16px] w-[16px] items-center justify-center rounded-full bg-orange-300 text-[11px] text-black"
							>{cartCount}</span
						>
						<span class="sr-only">Cart</span>
					</div>
				</a>
			</li>
			<li
				class="mt-4 flex items-center gap-2 border-t p-1 pt-8 dark:border-slate-500/80 sm:ml-8 sm:mt-0 sm:w-auto sm:border-t-0 sm:p-0"
			>
				<a
					href="/account"
					class=""
					on:click={clickHandler}>Account</a
				>
				<form
					action="/account?/logout"
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
						class="underline">Logout</button
					>)
				</form>
			</li>
		{:else}
			<a
				href="/login"
				class="block w-full p-1 sm:inline-block sm:w-auto sm:p-0"
				on:click={clickHandler}>Login</a
			>
		{/if}
	</div>
</ul>
