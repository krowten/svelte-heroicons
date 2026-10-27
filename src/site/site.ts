// Site metadata for the icon browser. Lives outside src/lib so it never ships in the package.

/** Canonical origin of the deployed site (GitHub Pages project page). */
export const SITE_URL = 'https://krowten.github.io/svelte-heroicons';

/** GitHub Pages redirects the bare project path to its trailing-slash form, so link that one. */
export const HOME_URL = `${SITE_URL}/`;

export const SITE_NAME = 'svelte-heroicons';
export const PACKAGE = '@krowten/svelte-heroicons';
export const REPO_URL = 'https://github.com/krowten/svelte-heroicons';
export const NPM_URL = `https://www.npmjs.com/package/${PACKAGE}`;

/** Social card shared by every page: 1200×630, the size Open Graph and X both expect. */
export const OG_IMAGE = {
	url: `${SITE_URL}/og.png`,
	width: 1200,
	height: 630,
	alt: 'svelte-heroicons: Heroicons as Svelte 5 components'
};

export const AUTHOR = { '@type': 'Person', name: 'krowten', url: 'https://github.com/krowten' };
