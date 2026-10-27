import { llmsIndex } from '../../site/llms.js';

export const prerender = true;

export function GET(): Response {
	return new Response(llmsIndex(), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
