<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	type Props = { label: string; code: string; copyLabel?: string; primary?: boolean };

	const { label, code, copyLabel = 'Copy', primary = false }: Props = $props();

	const escape = (text: string) =>
		text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

	// Enough for the few shapes shown here: imports, component tags and a <script> block.
	const highlight = (text: string) =>
		escape(text).replace(
			/('[^'\n]*'|"[^"\n]*")|\b(import|from)\b|(&lt;\/?)([A-Za-z]\w*)/g,
			(_, string, keyword, bracket, tag) =>
				string
					? `<span class="whitespace-nowrap text-emerald-300">${string}</span>`
					: keyword
						? `<span class="text-violet-300">${keyword}</span>`
						: `${bracket}<span class="text-sky-300">${tag}</span>`
		);
</script>

<div class="min-w-0">
	<div class="mb-1.5 flex items-center justify-between">
		<h3 class="text-xs font-semibold tracking-wide text-slate-600 uppercase">{label}</h3>
		<CopyButton text={code} label={copyLabel} {primary} class="h-7 px-2.5 text-xs" />
	</div>
	<!-- eslint-disable svelte/no-at-html-tags -- escaped above; the code is our own -->
	<pre
		class="overflow-x-auto rounded-lg bg-slate-900 px-3.5 py-3 font-mono text-[13px] leading-relaxed whitespace-pre-wrap [tab-size:2] text-slate-100"><code
			>{@html highlight(code)}</code
		></pre>
	<!-- eslint-enable svelte/no-at-html-tags -->
</div>
