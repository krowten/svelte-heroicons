<script lang="ts">
	import type { IconProps } from '../types.js';

	import IconBase from '../IconBase.svelte';

	const props: IconProps = $props();
</script>

<IconBase {...props} paths={{ outline: "<path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 19.5v-15m0 0-6.75 6.75M12 4.5l6.75 6.75\"/>", solid: "<path fill-rule=\"evenodd\" d=\"M12 20.25a.75.75 0 0 1-.75-.75V6.31l-5.47 5.47a.75.75 0 0 1-1.06-1.06l6.75-6.75a.75.75 0 0 1 1.06 0l6.75 6.75a.75.75 0 1 1-1.06 1.06l-5.47-5.47V19.5a.75.75 0 0 1-.75.75Z\" clip-rule=\"evenodd\"/>" }} />
