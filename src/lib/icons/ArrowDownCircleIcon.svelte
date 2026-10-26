<script lang="ts">
	import type { IconProps } from '../types.js';

	import IconBase from '../IconBase.svelte';

	const props: IconProps = $props();
</script>

<IconBase {...props} paths={{ outline: "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z\"/>", solid: "<path fill-rule=\"evenodd\" d=\"M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z\" clip-rule=\"evenodd\"/>" }} />
