<script lang="ts">
	import type { IconName } from '#lib/icon-set.js';

	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Icon from '#lib/Icon.svelte';
	import PageMeta from '../../../site/PageMeta.svelte';
	import CodeBlock from '../../../site/CodeBlock.svelte';
	import CopyButton from '../../../site/CopyButton.svelte';
	import {
		componentName,
		componentSnippet,
		iconNames,
		iconTag,
		iconTitle,
		snippet,
		relatedIcons,
		svgMarkup
	} from '../../../site/icons.js';
	import { HOME_URL, PACKAGE, SITE_NAME, SITE_URL } from '../../../site/site.js';

	// the param matcher only lets icon names through
	const name = $derived(page.params.name as IconName);
	const component = $derived(componentName(name));
	const label = $derived(iconTitle(name));
	const url = $derived(`${SITE_URL}/icons/${name}`);
	const related = $derived(relatedIcons(name));
	const description = $derived(
		`The ${name} Heroicon for Svelte 5 in outline and solid: <Icon name="${name}" /> or the ${component} component. Copy the code or the raw SVG.`
	);

	const index = $derived(iconNames.indexOf(name));
	const previous = $derived(iconNames[index - 1]);
	const next = $derived(iconNames[index + 1]);

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Icons', item: HOME_URL },
				{ '@type': 'ListItem', position: 2, name: label, item: url }
			]
		}
	]);
</script>

<PageMeta
	title="{label} icon for Svelte ({component}) | {SITE_NAME}"
	socialTitle="{label} icon for Svelte"
	{description}
	{url}
	type="website"
	{jsonLd}
/>

<main class="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:py-12">
	<nav aria-label="Breadcrumb" class="text-sm text-slate-600">
		<ol class="flex items-center gap-1.5">
			<li><a href={resolve('/')} class="hover:text-slate-900">Icons</a></li>
			<li aria-hidden="true"><Icon name="chevron-right" class="size-3.5" /></li>
			<li aria-current="page" class="text-slate-900">{name}</li>
		</ol>
	</nav>

	<h1 class="mt-4 text-3xl font-bold tracking-tight text-balance text-slate-900 sm:text-4xl">
		{label} icon for Svelte
	</h1>
	<p class="mt-3 max-w-2xl text-base text-pretty text-slate-600">
		Render the <strong class="font-medium text-slate-900">{name}</strong> icon from Heroicons v2
		with
		<code class="font-mono text-[0.9em] whitespace-nowrap text-slate-900"
			>&lt;Icon name="{name}" /&gt;</code
		>
		from <code class="font-mono text-[0.9em] whitespace-nowrap text-slate-900">{PACKAGE}</code>, or
		import it alone as <code class="font-mono text-[0.9em] text-slate-900">{component}</code>. It
		renders the 24px outline style by default and the solid style with the
		<code class="font-mono text-[0.9em]">solid</code> prop, and takes its color from the surrounding text.
	</p>

	<div class="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
		{#each [false, true] as solid (solid)}
			<section class="rounded-2xl border border-slate-200">
				<div
					class="grid h-36 place-items-center rounded-t-2xl bg-slate-100 bg-[radial-gradient(var(--color-slate-300)_1px,transparent_1px)] bg-size-[16px_16px] text-slate-900 sm:h-56"
				>
					<Icon {name} {solid} class="size-20 sm:size-28" strokeWidth={1.25} />
				</div>
				<div
					class="flex flex-col items-start gap-2 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4"
				>
					<h2 class="text-sm font-semibold text-slate-900">{solid ? 'Solid' : 'Outline'}</h2>
					<CopyButton text={svgMarkup(name, solid)} label="Copy SVG" class="h-8 text-xs" />
				</div>
			</section>
		{/each}
	</div>

	<div class="mt-8 grid gap-5">
		<CodeBlock label="Install" code={`npm install ${PACKAGE}`} />
		<CodeBlock label="By name" code={snippet('Icon', iconTag(name), iconTag(name, true))} primary />
		<CodeBlock label="Or as its own component" code={componentSnippet(name)} />
	</div>

	{#if related.length}
		<section class="mt-12">
			<h2 class="text-lg font-semibold text-slate-900">Related icons</h2>
			<ul class="mt-4 grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-3">
				{#each related as other (other)}
					<li>
						<a
							href={resolve('/icons/[name=icon]', { name: other })}
							class="flex h-24 flex-col items-center justify-center gap-2.5 rounded-xl bg-slate-100 px-2 text-slate-700 transition-colors hover:bg-slate-200/70 hover:text-slate-900 focus-visible:ring-3 focus-visible:ring-violet-500/40 focus-visible:outline-none"
						>
							<Icon name={other} class="size-6" />
							<span class="max-w-full truncate text-xs text-slate-600">{other}</span>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<nav
		aria-label="More icons"
		class="mt-12 flex justify-between gap-4 border-t border-slate-200 pt-6 text-sm"
	>
		{#if previous}
			<a
				href={resolve('/icons/[name=icon]', { name: previous })}
				class="flex items-center gap-2 font-medium text-slate-700 hover:text-violet-700"
			>
				<Icon name="arrow-left" class="size-4" />
				{previous}
			</a>
		{:else}
			<span></span>
		{/if}
		{#if next}
			<a
				href={resolve('/icons/[name=icon]', { name: next })}
				class="flex items-center gap-2 font-medium text-slate-700 hover:text-violet-700"
			>
				{next}
				<Icon name="arrow-right" class="size-4" />
			</a>
		{/if}
	</nav>
</main>
