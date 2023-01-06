<script lang="ts">
	import '../app.css';
	import iconSet from '$lib/icon-set';
	import Icon from '$lib/Icon.svelte';
	let searchText = '';
	const variants: string[] = ['outline', 'solid'];
	const upperCase = (text: string): string => {
		return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
	};
	$: icons = Object.keys(iconSet).filter((el) => {
		if (searchText) {
			const regexp = new RegExp(searchText, 'i');
			return el.match(regexp);
		}
		return true;
	});
</script>

<header class="bg-purple-700 px-4 sm:px-6 lg:px-16">
	<div class="max-w-10xl mx-auto divide-y divide-black divide-opacity-10">
		<div class="py-6 flex items-center text-sm leading-5">
			<div class="space-x-4">
				<span class="text-3xl text-purple-100">heroicons</span>
				<span class="text-xl text-purple-400">for SvelteKit</span>
			</div>

			<div class="flex space-x-10 ml-auto">
				<a href="https://github.com/krowten/svelte-heroicons" class="group flex">
					<div
						class="w-full sm:w-auto inline-flex items-center justify-center text-purple-900 group-hover:text-purple-500 font-medium leading-none bg-white rounded-lg shadow-sm group-hover:shadow-lg py-3 px-5 border border-transparent transform-gpu group-hover:-translate-y-0.5 transition-all duration-150"
					>
						<svg
							width="24"
							height="24"
							fill="currentColor"
							class="text-purple-600 mr-3 text-opacity-50 transform"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
							/>
						</svg>
						<span>Documentation</span>
					</div>
				</a>
			</div>
		</div>
	</div>
</header>

<form class="group sticky top-0 z-50 bg-white px-4 sm:px-6 lg:px-16 shadow">
	<div class="max-w-10xl mx-auto flex">
		<label for="search-input" class="flex-none pr-3 flex items-center">
			<span class="sr-only">Search all 230 icons</span>
			<svg
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				class="text-gray-400 group-focus-within:text-gray-500 transition-colors duration-150"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</label>
		<input
			type="text"
			id="search-input"
			bind:value={searchText}
			placeholder="Search all 230 icons (Press “/” to focus)"
			class="flex-auto py-6 text-base leading-6 text-gray-500 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400"
		/>
	</div>
</form>

<div class="container mx-auto lg:flex divide-x divide-gray-300">
	<div class="p-6 flex-1">
		<header class="col-start-1 row-start-1 flex flex-wrap items-baseline">
			<h2 class="flex-none text-lg leading-6 font-medium text-gray-900 mr-3">Outline</h2>
			<p class="hidden sm:block flex-auto text-gray-400 text-sm leading-5 font-medium">
				2px stroke weight, 24x24 bounding box
			</p>
			<p class="hidden sm:block flex-none w-full text-sm leading-5 mt-3">
				For primary navigation and marketing sections, designed to be rendered at 24x24.
			</p>
		</header>
		<div class="my-4 grid grid-cols-3 sm:grid-cols-4 gap-10 text-center">
			{#each icons as name}
				<div class="text-gray-600">
					<div
						class="p-8 border border-gray-300 rounded-lg aspect-square flex justify-center items-center"
					>
						<Icon class="h-6 w-6" {name} />
					</div>
					<div class="text-xs py-2">{name}</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="p-6 flex-1">
		<header class="col-start-1 row-start-1 flex flex-wrap items-baseline">
			<h2 class="flex-none text-lg leading-6 font-medium text-gray-900 mr-3">Solid</h2>
			<p class="hidden sm:block flex-auto text-gray-400 text-sm leading-5 font-medium">
				Solid fill, 24x24 bounding box
			</p>
			<p class="hidden sm:block flex-none w-full text-sm leading-5 mt-3">
				For buttons, form elements, and to support text, designed to be rendered at 24x24.
			</p>
		</header>

		<div class="my-4 grid grid-cols-3 sm:grid-cols-4 gap-10 text-center">
			{#each icons as name}
				<div class="text-gray-600">
					<div
						class="p-8 border border-gray-300 rounded-lg aspect-square flex justify-center items-center"
					>
						<Icon class="h-6 w-6" {name} solid />
					</div>
					<div class="text-xs py-2">{name}</div>
				</div>
			{/each}
		</div>
	</div>
</div>
