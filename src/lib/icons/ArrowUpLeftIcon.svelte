<script lang="ts">
	
	
	export let solid: boolean = false;
	export let viewBox: string = '0 0 24 24';
    export let strokeWidth = '2';
	export let stroke = !solid ? 'currentColor' : 'none';
	export let fill = solid ? 'currentColor' : 'none';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
	stroke-width={strokeWidth}
	{viewBox}
	{stroke}
	{fill}
	{...$$props}
>
	{#if solid}<path fill-rule="evenodd" d="M5.25 6.31v9.44a.75.75 0 01-1.5 0V4.5a.75.75 0 01.75-.75h11.25a.75.75 0 010 1.5H6.31l13.72 13.72a.75.75 0 11-1.06 1.06L5.25 6.31z" clip-rule="evenodd"/>{:else}<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25"/>{/if}
</svg>