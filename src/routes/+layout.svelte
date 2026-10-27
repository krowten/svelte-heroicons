<script lang="ts">
	import './layout.css';
	import { asset, resolve } from '$app/paths';
	import { GOOGLE_SITE_VERIFICATION } from '$app/env/public';
	import { version } from '../../package.json';
	import { NPM_URL, REPO_URL } from '../site/site.js';

	const { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={asset('favicon.svg')} type="image/svg+xml" />
	<link rel="apple-touch-icon" href={asset('apple-touch-icon.png')} />
	{#if GOOGLE_SITE_VERIFICATION}
		<meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
	{/if}
</svelte:head>

<div class="flex min-h-screen flex-col">
	<header class="border-b border-slate-200 bg-white">
		<div class="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 sm:px-6 lg:px-8">
			<a href={resolve('/')} class="flex items-center gap-2.5 text-[17px] font-bold tracking-tight">
				<img src={asset('favicon.svg')} alt="" class="size-8" />
				svelte-heroicons
			</a>
			<span
				class="hidden rounded-full bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600 sm:inline"
				>v{version}</span
			>

			<nav class="ml-auto flex items-center gap-1 text-sm font-medium text-slate-700">
				<a
					rel="external"
					href={NPM_URL}
					class="rounded-md px-2.5 py-2 hover:bg-slate-100 hover:text-slate-900">npm</a
				>
				<a
					rel="external"
					href={REPO_URL}
					class="flex items-center gap-1.5 rounded-md px-2.5 py-2 hover:bg-slate-100 hover:text-slate-900"
				>
					<svg viewBox="0 0 24 24" fill="currentColor" class="size-4" aria-hidden="true">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
						/>
					</svg>
					GitHub
				</a>
			</nav>
		</div>
	</header>

	{@render children()}

	<footer class="border-t border-slate-200 text-sm text-slate-600">
		<div
			class="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-6 sm:px-6 lg:px-8"
		>
			<p>
				Icons by <a
					target="_blank"
					rel="external noreferrer"
					href="https://heroicons.com"
					class="underline-offset-4 hover:underline">Heroicons</a
				> (Tailwind Labs). Not affiliated with Tailwind Labs.
			</p>
			<p class="flex gap-4 sm:ml-auto">
				<a rel="external" href="{REPO_URL}/blob/main/CHANGELOG.md" class="hover:text-slate-900"
					>Changelog</a
				>
				<a href={resolve('/llms.txt')} class="hover:text-slate-900">llms.txt</a>
				<a rel="external" href="{REPO_URL}/blob/main/LICENSE.md" class="hover:text-slate-900"
					>MIT License</a
				>
			</p>
		</div>
	</footer>
</div>
