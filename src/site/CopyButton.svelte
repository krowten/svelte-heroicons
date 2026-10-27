<script lang="ts">
	import Icon from '#lib/Icon.svelte';

	type Props = {
		text: string;
		label: string;
		primary?: boolean;
		/** Icon only, with the label for screen readers. */
		compact?: boolean;
		tabindex?: number;
		class?: string;
	};

	const {
		text,
		label,
		primary = false,
		compact = false,
		tabindex,
		class: className = ''
	}: Props = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	const copy = async () => {
		await navigator.clipboard.writeText(text);
		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = false), 1500);
	};
</script>

<button
	type="button"
	onclick={copy}
	{tabindex}
	data-primary={primary || undefined}
	title={compact ? label : undefined}
	class={[
		'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border text-sm font-medium whitespace-nowrap transition-colors',
		compact ? 'size-8' : 'h-9 px-3',
		primary
			? 'border-violet-600 bg-violet-600 text-white hover:border-violet-700 hover:bg-violet-700'
			: 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50',
		className
	]}
>
	<Icon
		name={copied ? 'check' : 'clipboard-document'}
		class={[
			'size-4 transition-transform duration-200 ease-out motion-reduce:transition-none',
			copied && 'scale-110 motion-reduce:scale-100',
			copied && !primary && 'text-emerald-600'
		]}
	/>
	<!-- the label changes in place, so screen readers hear the confirmation -->
	<span aria-live="polite" class={compact ? 'sr-only' : ''}>{copied ? 'Copied' : label}</span>
</button>
