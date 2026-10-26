import { describe, expect, it } from 'vitest';

import { componentName, renderComponent, renderIconSet, renderIndex, svgBody } from './icons.ts';

const icon = {
	name: 'bars-3',
	outline: '<path d="M1 1"/>',
	solid: '<path fill-rule="evenodd" d="M2 2"/>'
};

describe('componentName', () => {
	it('converts kebab-case to PascalCase with an Icon suffix', () => {
		expect(componentName('beaker')).toBe('BeakerIcon');
		expect(componentName('arrow-up-on-square-stack')).toBe('ArrowUpOnSquareStackIcon');
	});

	it('keeps digits', () => {
		expect(componentName('bars-3-bottom-left')).toBe('Bars3BottomLeftIcon');
		expect(componentName('squares-2x2')).toBe('Squares2x2Icon');
	});
});

describe('svgBody', () => {
	it('returns the children of the root svg without formatting whitespace', () => {
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M1 1"/>
  <path d="M2 2"/>
</svg>
`;
		expect(svgBody(svg)).toBe('<path d="M1 1"/><path d="M2 2"/>');
	});

	it('throws on input that is not an svg', () => {
		expect(() => svgBody('<div></div>')).toThrow('Not an SVG document');
	});
});

describe('renderers', () => {
	it('renders a component that passes both variants to IconBase', () => {
		const component = renderComponent(icon);
		expect(component).toContain("import IconBase from '../IconBase.svelte';");
		expect(component).toContain(
			`paths={{ outline: "<path d=\\"M1 1\\"/>", solid: "<path fill-rule=\\"evenodd\\" d=\\"M2 2\\"/>" }}`
		);
	});

	it('renders the icon set with a name union', () => {
		const iconSet = renderIconSet([icon]);
		expect(iconSet).toContain("export type IconName =\n\t| 'bars-3';");
		expect(iconSet).toContain(`'bars-3': { outline: "<path d=\\"M1 1\\"/>"`);
	});

	it('renders the index with Icon and every component', () => {
		const index = renderIndex([icon]);
		expect(index).toContain("export { default as Icon } from './Icon.svelte';");
		expect(index).toContain("export { default as Bars3Icon } from './icons/Bars3Icon.svelte';");
	});
});
