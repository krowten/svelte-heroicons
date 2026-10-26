<script lang="ts">
	import type { IconProps } from '../types.js';

	import IconBase from '../IconBase.svelte';

	const props: IconProps = $props();
</script>

<IconBase {...props} paths={{ outline: "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 12h-15m0 0 6.75 6.75M4.5 12l6.75-6.75\"/>", solid: "<path fill-rule=\"evenodd\" d=\"M20.25 12a.75.75 0 0 1-.75.75H6.31l5.47 5.47a.75.75 0 1 1-1.06 1.06l-6.75-6.75a.75.75 0 0 1 0-1.06l6.75-6.75a.75.75 0 1 1 1.06 1.06l-5.47 5.47H19.5a.75.75 0 0 1 .75.75Z\" clip-rule=\"evenodd\"/>" }} />
