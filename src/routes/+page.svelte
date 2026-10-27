<script lang="ts">
	import type { IconName } from '#lib/icon-set.js';

	import { tick } from 'svelte';
	import { resolve } from '$app/paths';
	import Icon from '#lib/Icon.svelte';
	import { version } from '../../package.json';
	import PageMeta from '../site/PageMeta.svelte';
	import CodeBlock from '../site/CodeBlock.svelte';
	import CopyButton from '../site/CopyButton.svelte';
	import {
		componentSnippet,
		iconNames,
		iconTag,
		importOf,
		snippet,
		svgMarkup
	} from '../site/icons.js';
	import { v1Names } from '../site/v1-names.js';
	import { AUTHOR, HOME_URL, NPM_URL, PACKAGE, REPO_URL, SITE_NAME } from '../site/site.js';

	const total = iconNames.length;
	const title = `Heroicons for Svelte 5: ${total} icon components | ${SITE_NAME}`;
	const description = `All ${total} Heroicons for Svelte 5 in outline and solid, through one typed <Icon name> component or a tree-shakeable component per icon. Search and copy the code.`;

	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'SoftwareSourceCode',
			name: PACKAGE,
			description,
			url: HOME_URL,
			codeRepository: REPO_URL,
			programmingLanguage: ['Svelte', 'TypeScript'],
			runtimePlatform: 'Svelte 5',
			license: 'https://opensource.org/licenses/MIT',
			version,
			author: AUTHOR,
			sameAs: [NPM_URL, REPO_URL]
		},
		{ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: HOME_URL }
	];

	// "Arrow Up", "arrowup" and "ArrowUpIcon" all find arrow-up
	const normalize = (text: string) =>
		text
			.toLowerCase()
			.replace(/[\s_-]+/g, '')
			.replace(/icon$/, '');
	const keys = new Map(iconNames.map((name) => [name, normalize(name)]));
	// v1 names by prefix only, so "search" or "logout" find their v2 icons without "arrow up"
	// also matching arrow-narrow-up
	const oldKeys = new Map(iconNames.map((name) => [name, (v1Names[name] ?? []).map(normalize)]));

	let search = $state('');
	let solid = $state(false);
	let selected = $state<IconName | null>(null);
	let input: HTMLInputElement;
	let column: HTMLDivElement;

	// Scrolled down a long list, a short result would leave the page scrolled past the grid and
	// clip the sticky panel, so a new query returns to where the search bar starts sticking.
	const toResults = () => {
		const top = column.getBoundingClientRect().top + window.scrollY;
		if (window.scrollY > top) window.scrollTo({ top });
	};

	const query = $derived(normalize(search.trim()));
	const icons = $derived(
		iconNames.filter(
			(name) =>
				keys.get(name)!.includes(query) || oldKeys.get(name)!.some((key) => key.startsWith(query))
		)
	);

	let panel: HTMLElement;
	let tile: HTMLElement | null = null;

	const select = async (event: MouseEvent, name: IconName) => {
		// below lg there is no side panel, and modified clicks open the icon page as usual
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
		if (!matchMedia('(min-width: 64rem)').matches) return;
		event.preventDefault();
		selected = name;
		tile = event.currentTarget as HTMLElement;
		// Enter on a tile: the panel comes after all 324 tiles in tab order, so take focus there
		if (event.detail === 0) {
			await tick();
			panel.querySelector<HTMLButtonElement>('button[data-primary]')?.focus();
		}
	};

	const deselect = () => {
		selected = null;
		if (panel.contains(document.activeElement)) tile?.focus();
	};

	const onKeydown = (event: KeyboardEvent) => {
		if (event.key === '/' && document.activeElement !== input) {
			event.preventDefault();
			input.focus();
		} else if (event.key === 'Escape' && selected) {
			deselect();
		}
	};

	// a literal closing script tag would end this component's own <script> block
	const example = (specifier: string, tag: string) =>
		`<script>\n\t${importOf(specifier).replace(/\n/g, '\n\t')}\n<${'/'}script>\n\n${tag}`;
</script>

<PageMeta
	{title}
	socialTitle="Heroicons for Svelte 5"
	{description}
	url={HOME_URL}
	type="website"
	{jsonLd}
/>

<svelte:window onkeydown={onKeydown} />

<main class="flex-1">
	<section class="border-b border-slate-200 bg-slate-50">
		<div class="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
			<h1 class="text-3xl font-bold tracking-tight text-balance text-slate-900 sm:text-4xl">
				Heroicons for Svelte 5
			</h1>
			<p class="mt-2 max-w-3xl text-base text-pretty text-slate-600">
				All {total}
				<a
					target="_blank"
					rel="external noreferrer"
					href="https://heroicons.com"
					class="text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-violet-500"
					>Heroicons</a
				>
				for Svelte 5 in the 24px outline and solid styles, through one typed
				<code class="font-mono text-[0.9em] text-slate-900">&lt;Icon name&gt;</code> component. Click
				an icon to get its code.
			</p>
			<!-- below lg the Getting started panel comes after every icon, so newcomers get it here -->
			<div
				class="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white py-1 pr-1 pl-3 lg:hidden"
			>
				<code class="min-w-0 flex-1 truncate font-mono text-xs text-slate-700"
					><span class="mr-2 text-violet-600 select-none">$</span>npm install {PACKAGE}</code
				>
				<CopyButton text="npm install {PACKAGE}" label="Copy install command" compact />
			</div>
		</div>
	</section>

	<div class="mx-auto max-w-[1600px] lg:grid lg:grid-cols-[minmax(0,1fr)_26rem]">
		<div class="min-w-0 lg:min-h-dvh" bind:this={column}>
			<search
				class="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:flex-nowrap sm:px-6 lg:px-8"
			>
				<label
					class="group flex h-11 min-w-0 flex-1 basis-full items-center gap-2.5 rounded-xl border border-slate-300 px-3.5 shadow-xs transition-colors focus-within:border-violet-500 focus-within:ring-3 focus-within:ring-violet-500/15 sm:basis-auto"
				>
					<Icon name="magnifying-glass" class="size-5 shrink-0 text-slate-500" />
					<span class="sr-only">Search {total} icons</span>
					<input
						type="search"
						bind:this={input}
						bind:value={search}
						oninput={toResults}
						placeholder="Search {total} icons"
						autocomplete="off"
						spellcheck="false"
						class="h-full min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-500"
					/>
					{#if search}
						<button
							type="button"
							onclick={() => {
								search = '';
								input.focus();
								toResults();
							}}
							class="grid size-7 shrink-0 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900"
						>
							<Icon name="x-mark" class="size-4" aria-label="Clear search" />
						</button>
					{:else}
						<kbd
							class="hidden rounded border border-slate-200 px-1.5 font-mono text-xs text-slate-500 group-focus-within:hidden sm:block"
							>/</kbd
						>
					{/if}
				</label>
				<fieldset class="flex h-11 shrink-0 rounded-xl bg-slate-100 p-1">
					<legend class="sr-only">Style</legend>
					{#each [false, true] as value (value)}
						<label
							class="relative grid cursor-pointer place-items-center rounded-lg px-4 text-sm font-medium text-slate-600 transition-colors has-checked:bg-white has-checked:text-slate-900 has-checked:shadow-sm has-focus-visible:ring-2 has-focus-visible:ring-violet-500"
						>
							<input type="radio" name="style" {value} bind:group={solid} class="sr-only" />
							{value ? 'Solid' : 'Outline'}
						</label>
					{/each}
				</fieldset>
				<p class="shrink-0 text-sm text-slate-600 tabular-nums" aria-live="polite">
					{icons.length === total ? `${total} icons` : `${icons.length} of ${total}`}
				</p>
			</search>

			{#if icons.length}
				<ul
					class="grid grid-cols-[repeat(auto-fill,minmax(6.5rem,1fr))] gap-3 px-4 py-6 sm:px-6 lg:grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] lg:px-8"
				>
					{#each icons as name (name)}
						<li class="group/tile relative">
							<a
								href={resolve('/icons/[name=icon]', { name })}
								onclick={(event) => select(event, name)}
								aria-current={selected === name ? 'true' : undefined}
								class="flex h-28 flex-col items-center justify-center gap-2.5 rounded-xl border border-transparent bg-slate-100 px-2 text-slate-700 transition-colors hover:bg-slate-200/70 hover:text-slate-900 focus-visible:ring-3 focus-visible:ring-violet-500/40 focus-visible:outline-none aria-[current]:border-violet-600 aria-[current]:bg-violet-50 aria-[current]:text-violet-700"
							>
								<Icon {name} {solid} class="size-7" />
								<span class="line-clamp-2 max-w-full text-center text-xs/4 text-slate-600"
									>{name}</span
								>
							</a>
							<!-- one-click copy, the thing heroicons.com tiles do; outside the link so it stays a button -->
							<CopyButton
								text={iconTag(name, solid)}
								label="Copy <Icon name=&quot;{name}&quot; />"
								compact
								tabindex={-1}
								class="absolute top-1.5 right-1.5 size-7 border-transparent bg-white/80 opacity-0 group-hover/tile:opacity-100 max-lg:hidden"
							/>
						</li>
					{/each}
				</ul>
			{:else}
				<div class="px-4 py-16 text-center sm:px-6 lg:px-8">
					<p class="text-base font-medium text-slate-900">No icons match “{search}”.</p>
					<p class="mx-auto mt-2 max-w-md text-sm text-pretty text-slate-600">
						Search matches icon names, including the heroicons v1 names that v2 renamed.
					</p>
					<button
						type="button"
						onclick={() => {
							search = '';
							input.focus();
							toResults();
						}}
						class="mt-5 h-9 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
					>
						Clear search
					</button>
				</div>
			{/if}
		</div>

		<aside
			bind:this={panel}
			class="border-t border-slate-200 lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto lg:border-t-0 lg:border-l"
			aria-label={selected ?? 'Getting started'}
		>
			{#if selected}
				{const name = $derived(selected)}
				<div class="flex flex-col gap-5 p-6">
					<div
						class="relative grid h-44 place-items-center rounded-2xl bg-slate-100 bg-[radial-gradient(var(--color-slate-300)_1px,transparent_1px)] bg-size-[16px_16px] text-slate-900"
					>
						<Icon {name} {solid} class="size-24" strokeWidth={1.25} />
						<button
							type="button"
							onclick={deselect}
							class="absolute top-2 right-2 grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-white hover:text-slate-900"
						>
							<Icon name="x-mark" class="size-5" aria-label="Close" />
						</button>
					</div>
					<div>
						<h2 class="font-mono text-lg font-semibold text-slate-900">{name}</h2>
						<p class="mt-0.5 text-sm text-slate-600">24px · {solid ? 'solid' : 'outline'}</p>
					</div>
					<CodeBlock label="Install" code={`npm install ${PACKAGE}`} />
					<CodeBlock label="By name" code={snippet('Icon', iconTag(name, solid))} primary />
					<CodeBlock label="Or as its own component" code={componentSnippet(name, solid)} />
					<div class="flex flex-wrap gap-2">
						<CopyButton text={svgMarkup(name, solid)} label="Copy SVG" />
						<a
							href={resolve('/icons/[name=icon]', { name })}
							class="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-violet-700 hover:bg-violet-50"
						>
							Icon page
							<Icon name="arrow-right" class="size-4" />
						</a>
					</div>
				</div>
			{:else}
				<div class="flex flex-col gap-5 p-6">
					<div>
						<h2 class="text-lg font-semibold text-slate-900">Getting started</h2>
						<p class="mt-1 text-sm text-pretty text-slate-600">
							Requires Svelte 5. Click an icon to see its code.
						</p>
					</div>
					<CodeBlock label="Install" code={`npm install ${PACKAGE}`} />
					<CodeBlock label="By name" code={example('Icon', iconTag('beaker', solid))} />
					<div>
						<CodeBlock
							label="As its own component"
							code={example('BeakerIcon', `<BeakerIcon class="size-6"${solid ? ' solid' : ''} />`)}
						/>
						<p class="mt-2 text-sm text-pretty text-slate-600">
							<code class="font-mono text-[0.9em]">Icon</code> includes all {total} icons, about 65 KB
							gzipped. Separate components keep only the icons you import.
						</p>
					</div>
					<div>
						<h3 class="mb-2 text-xs font-semibold tracking-wide text-slate-600 uppercase">
							Optional props
						</h3>
						<dl class="divide-y divide-slate-200 rounded-lg border border-slate-200 text-sm">
							<div class="grid grid-cols-[7rem_1fr] gap-2 px-3 py-2.5">
								<dt class="font-mono text-slate-900">solid</dt>
								<dd class="text-slate-600">Render the filled style.</dd>
							</div>
							<div class="grid grid-cols-[7rem_1fr] gap-2 px-3 py-2.5">
								<dt class="font-mono text-slate-900">strokeWidth</dt>
								<dd class="text-slate-600">Outline stroke width, 1.5 by default.</dd>
							</div>
							<div class="grid grid-cols-[7rem_1fr] gap-2 px-3 py-2.5">
								<dt class="text-slate-900">Any attribute</dt>
								<dd class="text-slate-600">
									<code class="font-mono">class</code>, <code class="font-mono">aria-label</code>
									and the rest go to the <code class="font-mono">&lt;svg&gt;</code>.
								</dd>
							</div>
						</dl>
					</div>
					<a
						rel="external"
						href="{REPO_URL}#readme"
						class="inline-flex items-center gap-1.5 self-start text-sm font-medium text-violet-700 hover:underline"
					>
						Read the documentation
						<Icon name="arrow-right" class="size-4" />
					</a>
				</div>
			{/if}
		</aside>
	</div>
</main>
