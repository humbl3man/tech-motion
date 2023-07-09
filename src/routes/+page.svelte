<script lang="ts">
	import { slugify } from '$lib/utils/slugify.js';

	export let data;
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="mx-auto mt-8 flex max-w-screen-2xl gap-8 px-4 lg:mt-32">
		<div class="self-center">
			<h1 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
				Unleash Your Fitness Potential
			</h1>
			<p class="mb-8 max-w-2xl text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl lg:leading-relaxed">
				TechMotion is your ultimate destination for cutting-edge fitness gear. Discover a curated collection of top-quality
				equipment, apparel, and accessories that will take your workouts to the next level.
			</p>
			<div class="">
				<a
					href="/products"
					class="btn btn-xl btn-with-icon"
				>
					Shop Now
					<svg
						aria-hidden="true"
						class="-mr-1 ml-2 h-5 w-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</a>
			</div>
		</div>
		<div class="hidden grow-0 md:block md:max-w-sm lg:max-w-xl">
			<img
				src="/images/hero-image.jpg"
				class="object-fit rounded-lg shadow-md"
				alt=""
				aria-hidden="true"
			/>
		</div>
	</div>
</section>

<!-- Categories -->

<!-- <section class="my-12">
	<div class="container mx-auto px-4">
		<h2 class="mb-8 text-center text-3xl">Shop by Category</h2>

		<div class="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{#each data.categories as category (category.id)}
				<article>
					<a
						href="/products/{slugify(category.name)}"
						class="group block h-64 pb-8 text-slate-800"
					>
						<img
							src="/images/category/{category.id}.jpg"
							class="h-full w-full rounded-lg object-cover transition-opacity duration-300 group-hover:opacity-80"
							alt=""
							loading="lazy"
						/>
						<div class="mt-4 text-center dark:text-slate-100">{category.name}</div>
					</a>
				</article>
			{/each}
		</div>
	</div>
</section> -->
