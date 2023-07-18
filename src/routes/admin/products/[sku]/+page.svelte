<script lang="ts">
	import { Button, Helper, Input, Label, Select, Textarea } from 'flowbite-svelte';

	export let data;

	let { product } = data;
	let categoryItems = data.categories.map((cat) => ({ name: cat.name, value: cat.id }));
	let selectedCategory = data.product.categories[0].id;

	$: console.log(product);
	$: console.log(selectedCategory);
</script>

<header class="mb-12">
	<h1 class="mb-4 text-2xl">Manage Product</h1>
</header>

<section>
	<form
		method="post"
		action="?/update"
		class="flex max-w-screen-sm flex-col space-y-6"
	>
		<div>
			<Label
				for="name"
				class="mb-2 text-base">Product Name:</Label
			>
			<Input
				type="text"
				name="name"
				id="name"
			/>
		</div>
		<div>
			<Label
				for="price"
				class="mb-2 text-base">Product Price:</Label
			>
			<Input
				type="number"
				name="price"
				id="price"
			/>
			<Helper class="mt-2 text-sm dark:text-slate-300">Provide value in cents (number only)</Helper>
		</div>
		<div>
			<Label
				for="category"
				class="mb-2 text-base">Product Category:</Label
			>
			<Select
				id="category"
				name="category"
				items={categoryItems}
				bind:value={selectedCategory}
				placeholder="Choose Category..."
			/>
		</div>
		<div>
			<Label
				for="price"
				class="mb-2 text-base">Product Description:</Label
			>
			<Textarea
				name="price"
				id="price"
				placeholder="Add Description.."
				rows={5}
			/>
		</div>
		<div>
			<Button
				type="submit"
				color="blue">Update</Button
			>
		</div>
	</form>
</section>
