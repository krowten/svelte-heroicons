// Renders the social card and the touch icon from HTML, with the real
// icons. The icon count is part of the pictures: run `bun run images` after updating heroicons.
import { file } from 'bun';
import { chromium } from 'playwright';
import iconSet from '../src/lib/icon-set.ts';

const count = Object.keys(iconSet).length;
const mark = await file('static/favicon.svg').text();

const svg = (name: keyof typeof iconSet, strokeWidth = 1.5) =>
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}">${iconSet[name].outline}</svg>`;

// the highlighted one sits where the rotated grid keeps it fully in frame
const grid: (keyof typeof iconSet)[] = [
	'arrow-down-tray',
	'chat-bubble-left',
	'folder',
	'link',
	'academic-cap',
	'beaker',
	'bell',
	'bolt',
	'book-open',
	'bookmark',
	'calendar',
	'camera',
	'chart-bar',
	'check-circle',
	'cloud',
	'code-bracket',
	'cog-6-tooth',
	'cube',
	'sparkles',
	'envelope',
	'eye',
	'fire',
	'gift',
	'globe-alt',
	'heart',
	'home',
	'key',
	'light-bulb',
	'lock-closed',
	'map',
	'moon',
	'paper-airplane',
	'photo',
	'puzzle-piece',
	'rocket-launch',
	'star',
	'sun',
	'trash',
	'user',
	'wifi'
];

const tiles = grid
	.map((name) => {
		const on = name === 'sparkles';
		return `<div style="aspect-ratio:1;border-radius:14px;display:grid;place-items:center;background:${on ? '#7c3aed' : '#fff'};color:${on ? '#fff' : '#334155'};${on ? '' : 'box-shadow:0 1px 2px rgba(15,23,42,.06)'}"><div style="width:40px;height:40px">${svg(name)}</div></div>`;
	})
	.join('');

// Also the README banner. No install command: nobody can copy it from a picture.
const features = ['Typed', 'Tree-shakeable', 'Accessible']
	.map((t) => `<span style="background:#f1f5f9;border-radius:999px;padding:8px 16px">${t}</span>`)
	.join('');
const card = `<html>
<body style="margin:0;width:1200px;height:630px;font-family:ui-sans-serif,system-ui,sans-serif;background:#fff;color:#0f172a;position:relative;overflow:hidden">
	<div style="position:relative;z-index:1;width:640px;height:100%;box-sizing:border-box;padding:68px 0 64px 72px;display:flex;flex-direction:column;background:linear-gradient(90deg,#fff 88%,rgba(255,255,255,0))">
		<div style="display:flex;align-items:center;gap:16px;font-size:30px;font-weight:700;letter-spacing:-.01em"><div style="width:52px;height:52px">${mark}</div>svelte-heroicons</div>
		<div style="margin-top:auto;font-size:76px;line-height:1.02;font-weight:800;letter-spacing:-.035em">Heroicons<br>for Svelte 5</div>
		<div style="margin-top:22px;font-size:28px;color:#475569">${count} icons, outline and solid</div>
		<div style="margin-top:28px;display:flex;gap:10px;font-size:20px;font-weight:500;color:#334155">${features}</div>
	</div>
	<div style="position:absolute;top:-70px;right:-40px;width:600px;height:770px;background:#f1f5f9;display:grid;grid-template-columns:repeat(5,1fr);gap:16px;padding:36px;box-sizing:border-box;align-content:center;transform:rotate(-8deg)">${tiles}</div>
</body>
</html>`;

const touch = `<html><body style="margin:0;width:180px;height:180px;background:#7c3aed;display:grid;place-items:center"><div style="width:120px;height:120px;color:#fff">${svg('sparkles', 1.6)}</div></body></html>`;

const browser = await chromium.launch();
for (const [html, width, height, path] of [
	[card, 1200, 630, 'static/og.png'],
	[touch, 180, 180, 'static/apple-touch-icon.png']
] as const) {
	const page = await browser.newPage({ viewport: { width, height } });
	await page.setContent(html);
	await page.screenshot({ path });
	console.log(`wrote ${path}`);
}
await browser.close();
