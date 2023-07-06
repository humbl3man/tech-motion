<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import IconCart from '~icons/mdi/cart';
	import IconPerson from '~icons/mdi/person';

	export let isUserLoggedIn: boolean;

	const dispatch = createEventDispatcher();

	function clickHandler() {
		dispatch('click');
	}
	$: ({ cartCount } = $page.data);
</script>

<nav>
	<ul class="flex flex-col gap-4 dark:text-slate-300 sm:flex-row sm:items-center">
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
		<!-- Cart -->
		{#if isUserLoggedIn}
			<li>
				<a
					href="/cart"
					class="inline-block p-1 sm:w-auto sm:p-0"
					on:click={clickHandler}
				>
					<div class="relative flex gap-2 sm:block">
						<span
							class="sm:hidden"
							aria-hidden="true">Cart</span
						>
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
		{/if}
		<!-- account/login -->
		{#if isUserLoggedIn}
			<li>
				<a
					href="/account"
					class="flex gap-2 sm:block"
					on:click={clickHandler}
				>
					<span
						class="sm:hidden"
						aria-hidden="true">Account</span
					>
					<IconPerson
						class="text-[22px]"
						aria-hidden="true"
					/>
					<span class="sr-only">Account</span>
				</a>
			</li>
		{:else}
			<li>
				<a
					href="/login"
					class="block w-full p-1 sm:inline-block sm:w-auto sm:p-0"
					on:click={clickHandler}>Login</a
				>
			</li>
		{/if}
	</ul>
</nav>
