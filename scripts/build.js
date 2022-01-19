#!/usr/bin/env node

import { resolve, join, parse } from 'path';
import { readdir, readFile, writeFile } from 'fs/promises';

const currentDir = resolve();

const baseDir = join(currentDir, './node_modules/heroicons');
const outDir = join(currentDir, './src/lib');
const build = async () => {
	const regexp = /(?:<svg[^>]*>)([\s\S]*)(?:<\/svg>)/gm;
	const iconSet = {};
	const indexFile = [];
	const icons = await readdir(`${baseDir}/outline`);
	const template = await readFile(`${outDir}/Icon.svelte`, 'UTF8');
	for (let i = 0; i < icons.length; i++) {
		const icon = icons[i];
		const iconName = parse(icon).name;
		try {
			const outlineIcon = await readFile(`${baseDir}/outline/${icon}`, 'UTF8');
			const solidIcon = await readFile(`${baseDir}/solid/${icon}`, 'UTF8');

			const outline = outlineIcon.replace(regexp, '$1').replace(/(\n\s+)/gm, '');
			const solid = solidIcon.replace(regexp, '$1').replace(/(\n\s+)/gm, '');

			const capName = iconName
				.split('-')
				.map((el) => `${el.charAt(0).toUpperCase()}${el.slice(1)}`)
				.join('');

			const svelteIcon = template
				.replace(/import iconSet .+/g, '')
				.replace(/export let name.+/g, '')
				.replace(/(?:\{@html)(.*)(?:\})/g, `{#if solid}${solid}{:else}${outline}{/if}`);

			await writeFile(`${outDir}/icons/${capName}Icon.svelte`, svelteIcon, 'UTF8');

			indexFile.push(`export { default as ${capName}Icon } from './icons/${capName}Icon.svelte';`);

			iconSet[iconName] = {
				outline,
				solid
			};
		} catch (error) {
			console.log(error);
		}
	}
	await writeFile(`${outDir}/icon-set.ts`, `export default ${JSON.stringify(iconSet)}`, 'UTF8');
	await writeFile(`${outDir}/index.ts`, `${indexFile.join('\n')}`, 'UTF8');
};

build();
