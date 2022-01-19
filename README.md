## Description

[heroicons](https://heroicons.com) for Svelte

See all available icons here: https://krowten.github.io/svelte-heroicons

## Basic Usage

_Note that this library currently only supports Svelte 3+ / SvelteKit._

First, install `svelte-heroicons` from npm:

```sh
npm install --save @krowten/svelte-heroicons
```

Сomponent can be used directly:

```svelte
<script>
	import Icon from '@krowten/svelte-heroicons/Icon.svelte';
</script>

<div>
	<Icon name="beaker" class="h-5 w-5 text-blue-500" />
	<Icon name="beaker" class="h-5 w-5 text-blue-500" solid />
</div>
```

or each icon can be imported individually as a Svelte component:

```svelte
<script>
	import { BeakerIcon } from '@krowten/svelte-heroicons';
	// or import BeakerIcon from '@krowten/svelte-heroicons/icons/BeakerIcon.svelte';
</script>

<div>
	<BeakerIcon class="h-5 w-5 text-blue-500" />
	<BeakerIcon class="h-5 w-5 text-blue-500" solid />
</div>
```

Both icon styles are preconfigured to be stylable by setting the `color` CSS property, either manually or using utility classes like `text-gray-500` in a framework like [Tailwind CSS](https://tailwindcss.com).
