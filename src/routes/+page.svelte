<script lang="ts">
	import heroImage from '$lib/assets/images/hero.jpg';
	import headphonesImage from '$lib/assets/images/hp-headphones.jpg';
	import smartwatchImage from '$lib/assets/images/hp-smartwatches.jpg';
	import smartscaleImage from '$lib/assets/images/hp-smartscales.jpg';
	import bikesImage from '$lib/assets/images/hp-bikes.jpg';
</script>

<!-- <div class="relative isolate -mt-32 px-6 pt-36 lg:px-8">
	<div class="absolute left-0 top-0 h-full w-full brightness-50">
		<img
			src={heroImage}
			class="object-fit aspect-video h-full w-full object-cover"
			alt=""
			aria-hidden="true"
		/>
	</div>

	<div class="relative z-[5] mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
		<div class="text-center">
			<h1 class="sm-text-6xl font-sans text-4xl font-bold tracking-tight text-slate-50 md:text-8xl">
				Unleash Your Fitness Potential
			</h1>
			<p class="mt-6 text-xl leading-8 text-slate-100">Discover Cutting-Edge Fitness Tech for Your Active Lifestyle</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<a
					href="/products"
					class="btn btn-xl">View Our Products</a
				>
			</div>
		</div>
	</div>
</div> -->

<section class="bg-white dark:bg-gray-900">
	<div class="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-32">
		<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
			Unleash Your Fitness Potential
		</h1>
		<p class="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:px-48 lg:text-xl">
			Discover Cutting-Edge Fitness Tech for Your Active Lifestyle
		</p>
		<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
			<a
				href="/products"
				class="btn btn-xl inline-flex items-center"
			>
				View our Catalog
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
</section>

<!-- Categories -->

<section class="my-12">
	<div class="container mx-auto px-4">
		<h2 class="mb-8 text-center text-3xl">Shop by Category</h2>
		<!-- row1 -->
		<div class="grid grid-cols-2 gap-10 md:grid-cols-4">
			<article>
				<a
					href="/products/headphones"
					class="group block h-full text-slate-800 hover:text-slate-900"
				>
					<img
						src={headphonesImage}
						class="h-full w-full rounded-lg object-cover object-center transition-opacity duration-300 group-hover:opacity-80"
						alt=""
						loading="lazy"
					/>
					<div class="mt-4 text-center dark:text-slate-100">Wireless Headphones</div>
				</a>
			</article>
			<article>
				<a
					href="/products/scales"
					class="group block h-full text-slate-800"
				>
					<img
						src={smartscaleImage}
						class="h-full w-full rounded-lg object-cover object-center transition-opacity duration-300 group-hover:opacity-80"
						alt=""
						loading="lazy"
					/>
					<div class="mt-4 text-center dark:text-slate-100">Smart Scales</div>
				</a>
			</article>
			<article>
				<a
					href="/products/watches"
					class="group block h-full text-slate-800"
				>
					<img
						src={smartwatchImage}
						class="h-full w-full rounded-lg object-cover object-center transition-opacity duration-300 group-hover:opacity-80"
						alt=""
						loading="lazy"
					/>
					<div class="mt-4 text-center dark:text-slate-100">Smart Watches</div>
				</a>
			</article>
			<article>
				<a
					href="/products/bikes"
					class="group block h-full text-slate-800"
				>
					<img
						src={bikesImage}
						class="h-full w-full rounded-lg object-cover object-center transition-opacity duration-300 group-hover:opacity-80"
						alt=""
						loading="lazy"
					/>
					<div class="mt-4 text-center dark:text-slate-100">Stationary Bikes</div>
				</a>
			</article>
		</div>
	</div>
</section>
