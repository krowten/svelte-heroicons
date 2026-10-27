import type { IconName } from '#lib/icon-set.js';

import iconSet from '#lib/icon-set.js';
import { componentName } from '../../scripts/icons.js';

export { componentName };

export const iconNames = Object.keys(iconSet) as IconName[];

export const isIconName = (name: string): name is IconName => Object.hasOwn(iconSet, name);

/** `arrow-up-tray` → `Arrow up tray`, for titles and alt text. */
export const iconTitle = (name: string) => {
	const words = name.replace(/-/g, ' ');
	return words.charAt(0).toUpperCase() + words.slice(1);
};

/** An import statement, one specifier per line so it reads well in the narrow code panels. */
export const importOf = (specifier: string) =>
	`import {\n\t${specifier}\n} from '@krowten/svelte-heroicons';`;

/** The icon as its own component, for when bundle size matters. */
export const componentSnippet = (name: string, solid = false) =>
	snippet(componentName(name), `<${componentName(name)} class="size-6"${solid ? ' solid' : ''} />`);

/** Standalone SVG markup of one variant, as heroicons ships it. */
export const svgMarkup = (name: IconName, solid: boolean) =>
	solid
		? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">${iconSet[name].solid}</svg>`
		: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">${iconSet[name].outline}</svg>`;

/** Icons that share a word with this one, closest name first; for "related icons" links. */
export const relatedIcons = (name: IconName, limit = 12) => {
	const words = new Set(name.split('-'));
	return iconNames
		.filter((other) => other !== name)
		.map((other) => ({ other, shared: other.split('-').filter((w) => words.has(w)).length }))
		.filter(({ shared }) => shared > 0)
		.sort((a, b) => b.shared - a.shared)
		.slice(0, limit)
		.map(({ other }) => other);
};

/** The import and the tag together, as a block to paste. */
export const snippet = (specifier: string, ...tags: string[]) =>
	`${importOf(specifier)}\n\n${tags.join('\n')}`;

export const iconTag = (name: string, solid = false) =>
	`<Icon name="${name}" class="size-6"${solid ? ' solid' : ''} />`;
