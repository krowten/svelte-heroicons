<script lang="ts">
	import type { IconProps } from '../types.js';

	import IconBase from '../IconBase.svelte';

	const props: IconProps = $props();
</script>

<IconBase {...props} paths={{ outline: "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z\"/>", solid: "<path fill-rule=\"evenodd\" d=\"M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z\" clip-rule=\"evenodd\"/><path fill-rule=\"evenodd\" d=\"M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z\" clip-rule=\"evenodd\"/>" }} />
