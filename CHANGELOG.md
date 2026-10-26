# Changelog

## 0.2.0

### Breaking

- Requires Svelte 5. Components use runes and no longer work with Svelte 3/4; stay on `0.1.x` for those.
- Icons default to `width="24" height="24"`. Unsized icons used to stretch to their container, or collapse to nothing inside `inline-flex` elements (#2). CSS sizes such as `class="size-5"` still win.
- The outline stroke width defaults to `1.5`, the value heroicons v2 is designed for (was `2`). Pass `strokeWidth={2}` to keep the old look.

### Added

- Icons from heroicons 2.2.0: 324 icons, up from 292. No icons were removed or renamed.
- `Icon` is exported from the package entry point: `import { Icon } from '@krowten/svelte-heroicons'`.
- `IconName` and `IconProps` types. `Icon`'s `name` prop only accepts existing icon names.
- Icons with `aria-label` or `aria-labelledby` get `role="img"` instead of `aria-hidden="true"`.
- `data-slot="icon"` on the `<svg>`, matching the upstream SVG files.

### Fixed

- Props like `solid` and `strokeWidth` are no longer rendered as attributes on the `<svg>`.
- `heroicons` is no longer installed as a runtime dependency; the icons are inlined into the components.

## 0.1.0

- Heroicons v2 icons for Svelte 3.
