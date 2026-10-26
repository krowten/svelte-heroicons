# @krowten/svelte-heroicons

[Heroicons](https://heroicons.com) as Svelte 5 components: all 324 icons in the 24px outline and solid styles, typed and tree-shakeable.

Browse the icons: https://krowten.github.io/svelte-heroicons

## Installation

```sh
npm install @krowten/svelte-heroicons
```

Requires Svelte 5.

## Usage

Import icons by name. Only the icons you import end up in your bundle.

```svelte
<script>
	import { BeakerIcon } from '@krowten/svelte-heroicons';
</script>

<BeakerIcon class="size-6 text-blue-500" />
<BeakerIcon class="size-6 text-blue-500" solid />
```

Component names are the heroicons names in PascalCase with an `Icon` suffix: `arrow-up-tray` is `ArrowUpTrayIcon`. You can also import a single file directly:

```svelte
<script>
	import BeakerIcon from '@krowten/svelte-heroicons/icons/BeakerIcon.svelte';
</script>
```

When the icon is only known at runtime, use `Icon` with a `name`. It bundles every icon, so prefer named imports when you can.

```svelte
<script lang="ts">
	import { Icon, type IconName } from '@krowten/svelte-heroicons';

	const { name }: { name: IconName } = $props();
</script>

<Icon {name} class="size-5" />
```

`IconName` is a union of all icon names, so a typo is a type error.

## Props

| Prop          | Type               | Default | Description                                  |
| ------------- | ------------------ | ------- | -------------------------------------------- |
| `solid`       | `boolean`          | `false` | Render the solid variant instead of outline. |
| `strokeWidth` | `number \| string` | `1.5`   | Stroke width of the outline variant.         |
| `name`        | `IconName`         | —       | `Icon` only: which icon to render. Required. |

Any other attribute or event handler (`class`, `style`, `fill`, `onclick`, …) is passed through to the `<svg>` element and overrides the defaults.

## Styling

Icons use `currentColor`, so they take the text color of their parent or of a class like `text-gray-500` in [Tailwind CSS](https://tailwindcss.com). Icons are 24×24 by default through `width` and `height` attributes, so they never collapse or stretch to fill their container; any CSS size, like `class="size-5"`, takes precedence.

## Accessibility

Icons are decorative by default and rendered with `aria-hidden="true"`. Give an icon an `aria-label` (or `aria-labelledby`) and it is exposed to screen readers as an image instead:

```svelte
<button>
	<TrashIcon class="size-5" aria-label="Delete" />
</button>
```

## Development

```sh
bun install
bun run dev          # icon browser at http://localhost:5173
bun run generate     # regenerate src/lib from the installed heroicons package
bun run test         # generated files check, unit and component tests, e2e
bun run check        # svelte-check
bun run lint
```

The files in `src/lib/icons/`, `src/lib/icon-set.ts` and `src/lib/index.ts` are generated from `node_modules/heroicons`. After updating `heroicons`, run `bun run generate` and commit the result. Component tests run in Chromium; install it once with `bunx playwright install chromium`.

`bun run build` builds both the icon browser (`build/`) and the package (`dist/`). Every push to `main` deploys the icon browser to GitHub Pages (`.github/workflows/pages.yml`).

To release, set `version` in `package.json`, move the CHANGELOG entries under it and push a `v<version>` tag. `.github/workflows/release.yml` runs the tests and stages the release on npm with provenance; it goes live once approved on npmjs.com.

## License

MIT © Vladimir Kraikovskii. Icons are [Heroicons](https://github.com/tailwindlabs/heroicons) by Tailwind Labs, MIT licensed.
