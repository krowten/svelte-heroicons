<script lang="ts">
	import type { IconName } from './icon-set.js';
	import type { IconProps } from './types.js';

	import IconBase from './IconBase.svelte';
	import iconSet from './icon-set.js';

	const { name, ...rest }: IconProps & { name: IconName } = $props();
</script>

<IconBase {...rest} paths={iconSet[name]} />
