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
	{#if solid}<path d="M4.08 5.227A3 3 0 016.979 3H17.02a3 3 0 012.9 2.227l2.113 7.926A5.228 5.228 0 0018.75 12H5.25a5.228 5.228 0 00-3.284 1.153L4.08 5.227z"/><path fill-rule="evenodd" d="M5.25 13.5a3.75 3.75 0 100 7.5h13.5a3.75 3.75 0 100-7.5H5.25zm10.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5zm3.75-.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" clip-rule="evenodd"/>{:else}<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z"/>{/if}
</svg>