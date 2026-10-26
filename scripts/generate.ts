#!/usr/bin/env bun
// Generates src/lib/icons/*.svelte, src/lib/icon-set.ts and src/lib/index.ts from the installed
// heroicons package. With --check it only verifies that the committed files are up to date.

import { file, Glob, write } from 'bun';
import { unlink } from 'node:fs/promises';

import { componentName, renderComponent, renderIconSet, renderIndex, svgBody } from './icons.ts';

const root = new URL('..', import.meta.url).pathname;
const source = `${root}node_modules/heroicons/24`;
const lib = `${root}src/lib`;
const check = process.argv.includes('--check');

const names = (await Array.fromAsync(new Glob('*.svg').scan(`${source}/outline`)))
	.map((svg) => svg.slice(0, -'.svg'.length))
	.sort();

const icons = await Promise.all(
	names.map(async (name) => ({
		name,
		outline: svgBody(await file(`${source}/outline/${name}.svg`).text()),
		solid: svgBody(await file(`${source}/solid/${name}.svg`).text())
	}))
);

const expected = new Map<string, string>([
	[`${lib}/icon-set.ts`, renderIconSet(icons)],
	[`${lib}/index.ts`, renderIndex(icons)],
	...icons.map((icon): [string, string] => [
		`${lib}/icons/${componentName(icon.name)}.svelte`,
		renderComponent(icon)
	])
]);

const existing = (await Array.fromAsync(new Glob('*.svelte').scan(`${lib}/icons`))).map(
	(component) => `${lib}/icons/${component}`
);
const stale = existing.filter((path) => !expected.has(path));
const changed: string[] = [];
for (const [path, content] of expected) {
	const current = file(path);
	if (!(await current.exists()) || (await current.text()) !== content) changed.push(path);
}

if (check) {
	const outdated = [...changed, ...stale].map((path) => path.slice(root.length));
	if (outdated.length) {
		console.error(
			`Generated icons are out of date, run \`bun run generate\`:\n${outdated.join('\n')}`
		);
		process.exit(1);
	}
	console.log(`${icons.length} icons are up to date`);
} else {
	await Promise.all(changed.map((path) => write(path, expected.get(path)!)));
	await Promise.all(stale.map((path) => unlink(path)));
	console.log(`${icons.length} icons: ${changed.length} files written, ${stale.length} removed`);
}
