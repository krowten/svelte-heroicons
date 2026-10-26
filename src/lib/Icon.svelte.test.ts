import type { Component } from 'svelte';
import type { IconProps } from '#lib';

import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import * as lib from '#lib';
import Icon from '#lib/Icon.svelte';
import BeakerIcon from '#lib/icons/BeakerIcon.svelte';
import iconSet from '#lib/icon-set.js';

import { componentName } from '../../scripts/icons.ts';

const SVG = 'http://www.w3.org/2000/svg';

const svgOf = ({ container }: { container: HTMLElement }) => container.querySelector('svg')!;

describe('Icon', () => {
	it('renders outline paths as SVG elements', async () => {
		const svg = svgOf(await render(Icon, { name: 'beaker' }));
		const path = svg.querySelector('path')!;
		expect(path.namespaceURI).toBe(SVG);
		expect(path.getBBox().width).toBeGreaterThan(0);
		expect(svg.getAttribute('viewBox')).toBe('0 0 24 24');
		expect(svg.getAttribute('fill')).toBe('none');
		expect(svg.getAttribute('stroke')).toBe('currentColor');
		expect(svg.getAttribute('stroke-width')).toBe('1.5');
	});

	it('switches between variants when solid changes', async () => {
		const result = await render(Icon, { name: 'beaker' });
		await result.rerender({ name: 'beaker', solid: true });
		const svg = svgOf(result);
		expect(svg.getAttribute('fill')).toBe('currentColor');
		expect(svg.hasAttribute('stroke')).toBe(false);
		expect(svg.innerHTML).toContain('fill-rule="evenodd"');
	});

	it('switches icons when name changes', async () => {
		const result = await render(Icon, { name: 'beaker' });
		await result.rerender({ name: 'bell' });
		expect(svgOf(result).innerHTML).toContain(iconSet.bell.outline.slice(0, 40));
	});
});

describe('icon props', () => {
	it('passes attributes through to the svg', async () => {
		await render(BeakerIcon, { class: 'size-5', 'data-testid': 'icon', style: 'color: red' });
		const svg = page.getByTestId('icon').element();
		expect(svg.getAttribute('class')).toBe('size-5');
		expect(getComputedStyle(svg).color).toBe('rgb(255, 0, 0)');
	});

	it('lets attributes override the defaults', async () => {
		const svg = svgOf(
			await render(BeakerIcon, { fill: 'red', 'stroke-width': 2, viewBox: '0 0 20 20' })
		);
		expect(svg.getAttribute('fill')).toBe('red');
		expect(svg.getAttribute('stroke-width')).toBe('2');
		expect(svg.getAttribute('viewBox')).toBe('0 0 20 20');
	});

	it('renders at 24px without CSS, even inside inline-flex where an unsized svg collapses', async () => {
		const result = await render(BeakerIcon);
		result.container.style.display = 'inline-flex';
		const { width, height } = svgOf(result).getBoundingClientRect();
		expect([width, height]).toEqual([24, 24]);
	});

	it('lets CSS override the default size', async () => {
		const svg = svgOf(await render(BeakerIcon, { style: 'width: 40px; height: 40px' }));
		const { width, height } = svg.getBoundingClientRect();
		expect([width, height]).toEqual([40, 40]);
	});

	it('supports the strokeWidth prop without leaking props as attributes', async () => {
		const svg = svgOf(await render(BeakerIcon, { strokeWidth: 2, solid: false }));
		expect(svg.getAttribute('stroke-width')).toBe('2');
		expect(svg.hasAttribute('strokeWidth')).toBe(false);
		expect(svg.hasAttribute('solid')).toBe(false);
	});

	it('forwards event handlers', async () => {
		const onclick = vi.fn();
		await render(BeakerIcon, { onclick, 'data-testid': 'icon' });
		await page.getByTestId('icon').click();
		expect(onclick).toHaveBeenCalledOnce();
	});
});

describe('accessibility', () => {
	it('is hidden from assistive technology by default', async () => {
		const svg = svgOf(await render(BeakerIcon));
		expect(svg.getAttribute('aria-hidden')).toBe('true');
		expect(svg.hasAttribute('role')).toBe(false);
	});

	it('is exposed as an image when labelled', async () => {
		await render(BeakerIcon, { 'aria-label': 'Experiment' });
		await expect.element(page.getByRole('img', { name: 'Experiment' })).toBeInTheDocument();
	});
});

describe('generated components', () => {
	it('render the same markup as Icon for every icon and variant', async () => {
		const components = lib as unknown as Record<string, Component<IconProps>>;
		for (const name of Object.keys(iconSet) as (keyof typeof iconSet)[]) {
			for (const solid of [false, true]) {
				const expected = svgOf(await render(Icon, { name, solid })).outerHTML;
				const actual = svgOf(await render(components[componentName(name)], { solid })).outerHTML;
				expect(actual, `${name} solid=${solid}`).toBe(expected);
			}
		}
	});
});
