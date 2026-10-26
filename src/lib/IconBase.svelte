<script lang="ts">
	import type { IconPaths, IconProps } from './types.js';

	const {
		paths,
		solid = false,
		strokeWidth = 1.5,
		...rest
	}: IconProps & { paths: IconPaths } = $props();

	// A labelled icon carries meaning, so it is exposed as an image instead of hidden from AT.
	const labelled = $derived(Boolean(rest['aria-label'] || rest['aria-labelledby']));
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	width="24"
	height="24"
	fill={solid ? 'currentColor' : 'none'}
	stroke={solid ? undefined : 'currentColor'}
	stroke-width={solid ? undefined : strokeWidth}
	aria-hidden={labelled ? undefined : 'true'}
	role={labelled ? 'img' : undefined}
	data-slot="icon"
	{...rest}
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- paths are generated from heroicons, never user input -->
	{@html solid ? paths.solid : paths.outline}
</svg>
