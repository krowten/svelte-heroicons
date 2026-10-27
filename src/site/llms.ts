import readme from '../../README.md?raw';
import { NPM_URL, PACKAGE, REPO_URL, SITE_URL } from './site.js';
import { componentName, iconNames } from './icons.js';

export const LLMS_SUMMARY = `All ${iconNames.length} Heroicons v2 icons for Svelte 5 in the 24px outline and solid styles, through one typed <Icon name> component or a tree-shakeable component per icon.`;

/** Facts a model tends to get wrong about this package, in the order it needs them. */
const RULES = `- Install \`${PACKAGE}\`. The main API is one component that takes the heroicons name: \`import { Icon } from '${PACKAGE}'\`, then \`<Icon name="beaker" />\`. There is no \`@heroicons/svelte\` package.
- \`name\` is typed as \`IconName\`, the union of all heroicons v2 names (\`arrow-up-tray\`, \`magnifying-glass\`). Heroicons v1 names such as \`logout\` or \`search\` do not exist; the full list is below.
- \`Icon\` includes every icon, about 65 KB gzipped. When bundle size matters, import single icons as components instead: \`import { BeakerIcon } from '${PACKAGE}'\`, then \`<BeakerIcon />\`. The component name is the heroicons name in PascalCase plus \`Icon\`: \`arrow-up-tray\` is \`ArrowUpTrayIcon\`.
- Add the \`solid\` prop for the filled style: \`<Icon name="beaker" solid />\`. Only the 24px outline and solid styles are included, not the 20px mini or 16px micro ones.
- Icons are 24×24 by default. Size them with CSS (\`class="size-5"\`) and color them with the text color; they use \`currentColor\`.
- Icons are \`aria-hidden\` by default. An icon with an \`aria-label\` gets \`role="img"\`.
- Requires Svelte 5.`;

export const llmsIndex = () => `# ${PACKAGE}

> ${LLMS_SUMMARY}

${RULES}

## Docs

- [README](${REPO_URL}/blob/main/README.md): installation, usage, props, styling and accessibility
- [Icon browser](${SITE_URL}/): search the icons and copy their imports; every icon has a page at ${SITE_URL}/icons/<name>
- [Full reference](${SITE_URL}/llms-full.txt): the README and every icon name with its component, in one file

## Optional

- [npm package](${NPM_URL})
- [Source code](${REPO_URL})
- [Changelog](${REPO_URL}/blob/main/CHANGELOG.md)
`;

// the contributor sections of the README are noise for someone using the package
const usage = readme.slice(0, readme.indexOf('\n## Development')).trim();

export const llmsFull = () => `${usage}

## Rules

${RULES}

## All icons

Heroicons name (the \`name\` of \`<Icon>\`) → standalone component. Each renders the outline style, or the solid style with the \`solid\` prop.

${iconNames.map((name) => `- ${name} → ${componentName(name)}`).join('\n')}
`;
