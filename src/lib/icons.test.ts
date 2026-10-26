import { readdirSync } from 'node:fs';
import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';

import * as lib from '#lib';
import Icon from '#lib/Icon.svelte';
import BeakerIcon from '#lib/icons/BeakerIcon.svelte';
import iconSet from '#lib/icon-set.js';

const heroicons = readdirSync('node_modules/heroicons/24/outline').map((svg) =>
	svg.replace('.svg', '')
);

describe('icon set', () => {
	it('contains every 24px heroicon', () => {
		expect(Object.keys(iconSet).sort()).toEqual(heroicons.sort());
	});

	it('has both variants for every icon', () => {
		for (const { outline, solid } of Object.values(iconSet)) {
			expect(outline).toMatch(/^<path /);
			expect(solid).toMatch(/^<path /);
		}
	});

	it('exports Icon and one component per icon from the entry point', () => {
		expect(lib.Icon).toBe(Icon);
		expect(Object.keys(lib)).toHaveLength(heroicons.length + 1);
	});
});

describe('server rendering', () => {
	it('renders the outline variant by default', () => {
		const { body } = render(BeakerIcon);
		expect(body).toContain('width="24" height="24"');
		expect(body).toContain('fill="none"');
		expect(body).toContain('stroke="currentColor"');
		expect(body).toContain('stroke-width="1.5"');
		expect(body).toContain('aria-hidden="true"');
		expect(body).toContain(iconSet.beaker.outline);
	});

	it('renders the solid variant', () => {
		const { body } = render(BeakerIcon, { props: { solid: true } });
		expect(body).toContain('fill="currentColor"');
		expect(body).not.toContain('stroke=');
		expect(body).toContain(iconSet.beaker.solid);
	});

	it('renders the same markup from Icon and the named component', () => {
		expect(render(Icon, { props: { name: 'beaker', class: 'size-5' } }).body).toBe(
			render(BeakerIcon, { props: { class: 'size-5' } }).body
		);
	});
});
