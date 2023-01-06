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
	{#if solid}<path fill-rule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z" clip-rule="evenodd"/>{:else}<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>{/if}
</svg>