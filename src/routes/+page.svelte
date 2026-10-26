<script lang="ts">
	import type { IconName } from '#lib/icon-set.js';

	import Icon from '#lib/Icon.svelte';
	import iconSet from '#lib/icon-set.js';

	const names = Object.keys(iconSet) as IconName[];

	let search = $state('');
	let input: HTMLInputElement;

	const icons = $derived(names.filter((name) => name.includes(search.trim().toLowerCase())));

	const variants = [
		{
			title: 'Outline',
			size: '1.5px stroke, 24x24 bounding box',
			usage: 'For primary navigation and marketing sections, designed to be rendered at 24x24.',
			solid: false
		},
		{
			title: 'Solid',
			size: 'Solid fill, 24x24 bounding box',
			usage: 'For buttons, form elements, and to support text, designed to be rendered at 24x24.',
			solid: true
		}
	];

	const focusSearch = (event: KeyboardEvent) => {
		if (event.key === '/' && document.activeElement !== input) {
			event.preventDefault();
			input.focus();
		}
	};
</script>

<svelte:head>
	<title>Heroicons for Svelte</title>
	<meta name="description" content="All {names.length} heroicons as Svelte 5 components." />
</svelte:head>

<svelte:window onkeydown={focusSearch} />

<header class="bg-purple-700 px-4 sm:px-6 lg:px-16">
	<div class="flex items-center py-6">
		<h1 class="space-x-4">
			<span class="text-3xl text-purple-100">heroicons</span>
			<span class="text-xl text-purple-300">for Svelte</span>
		</h1>

		<a
			href="https://github.com/krowten/svelte-heroicons"
			class="ml-auto inline-flex items-center rounded-lg bg-white px-5 py-3 leading-none font-medium text-purple-900 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:text-purple-500 hover:shadow-lg"
		>
			<svg
				width="24"
				height="24"
				fill="currentColor"
				class="mr-3 text-purple-600/50"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
				/>
			</svg>
			Documentation
		</a>
	</div>
</header>

<search class="group sticky top-0 z-50 flex bg-white px-4 shadow-sm sm:px-6 lg:px-16">
	<label for="search-input" class="flex items-center pr-3">
		<span class="sr-only">Search all {names.length} icons</span>
		<Icon
			name="magnifying-glass"
			class="size-6 text-gray-400 transition-colors duration-150 group-focus-within:text-gray-500"
		/>
	</label>
	<input
		type="search"
		id="search-input"
		bind:this={input}
		bind:value={search}
		placeholder="Search all {names.length} icons (Press “/” to focus)"
		class="flex-auto py-6 text-base text-gray-500 placeholder-gray-500 outline-hidden focus:placeholder-gray-400"
	/>
</search>

<main class="container mx-auto divide-gray-300 lg:flex lg:divide-x">
	{#each variants as variant (variant.title)}
		<section class="flex-1 p-6">
			<header class="flex flex-wrap items-baseline">
				<h2 class="mr-3 text-lg font-medium text-gray-900">{variant.title}</h2>
				<p class="hidden flex-auto text-sm font-medium text-gray-400 sm:block">{variant.size}</p>
				<p class="mt-3 hidden w-full text-sm sm:block">{variant.usage}</p>
			</header>

			{#if icons.length}
				<ul class="my-4 grid grid-cols-3 gap-10 text-center sm:grid-cols-4">
					{#each icons as name (name)}
						<li class="text-gray-600">
							<div
								class="flex aspect-square items-center justify-center rounded-lg border border-gray-300 p-8"
							>
								<Icon {name} solid={variant.solid} class="size-6" />
							</div>
							<div class="py-2 text-xs break-words">{name}</div>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="my-4 text-gray-500">No icons match “{search}”.</p>
			{/if}
		</section>
	{/each}
</main>
