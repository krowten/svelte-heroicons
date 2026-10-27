import { llmsFull } from '../../site/llms.js';

export const prerender = true;

export function GET(): Response {
	return new Response(llmsFull(), { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
