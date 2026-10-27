import { defineParams } from '@sveltejs/kit/params';

export const params = defineParams({
	// Node loads this file on its own at build time, so it can't import the icon set. The site is
	// static: only the names `entries` lists in icons/[name=icon]/+page.ts are ever served.
	icon: (param) => (/^[a-z0-9]+(-[a-z0-9]+)*$/.test(param) ? param : undefined)
});
