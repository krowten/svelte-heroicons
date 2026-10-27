import { HOME_URL, SITE_URL } from '../../site/site.js';
import { iconNames } from '../../site/icons.js';

export const prerender = true;

/**
 * A project page can't serve the host's robots.txt, so search engines learn about this file
 * from Search Console, not robots.txt.
 */
export function GET(): Response {
	const urls = [HOME_URL, ...iconNames.map((name) => `${SITE_URL}/icons/${name}`)]
		.map((loc) => `\t<url><loc>${loc}</loc></url>`)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
	return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
