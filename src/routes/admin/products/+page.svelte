<script lang="ts">
	export let data;
	$: products = data.allProducts;
</script>

<h1 class="mb-4 text-2xl">Manage Products</h1>

<section class="dark:text-slate-300">
	{#each products as product (product.sku)}
		<div class="flex justify-between gap-4 border-b py-6 last:border-0 dark:border-slate-400/10">
			<div class="flex gap-4">
				<div class="w-24">
					<img
						class="h-full w-full object-cover"
						src={product.image}
						alt={product.name}
					/>
				</div>
				<div>
					<p class="dark:text-white">SKU: {product.sku}</p>
					<p class="dark:text-white">Name: {product.name}</p>
				</div>
			</div>
			<!-- <div class="text-right text-sm">
				<form
					method="post"
					action="?/delete_user"
					class="mt-2"
					use:enhance={() => {
						deleteUserRecords = [...deleteUserRecords, user.email];
						return async ({ result }) => {
							await invalidateAll();
							await applyAction(result);
							deleteUserRecords = deleteUserRecords.filter((record) => !record.includes(user.email));
						};
					}}
				>
					<input
						type="hidden"
						name="user_email"
						value={user.email}
					/>
					<Button
						color="red"
						outline
						disabled={deleteUserRecords.includes(user.email)}
						size="xs"
						type="submit"
					>
						{#if deleteUserRecords.includes(user.email)}
							<Spinner
								size="3"
								class="mr-4"
							/> Deleting...
						{:else}
							Delete User
						{/if}
					</Button>
				</form>
			</div> -->
		</div>
	{/each}
</section>
