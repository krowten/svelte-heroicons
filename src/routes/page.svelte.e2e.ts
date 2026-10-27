import { expect, test } from '@playwright/test';

const grid = (page: import('@playwright/test').Page) => page.getByRole('main').getByRole('list');

test.describe('icon browser', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('lists every icon and switches between outline and solid', async ({ page }) => {
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Heroicons for Svelte 5');
		const items = grid(page).getByRole('listitem');
		await expect(items).toHaveCount(324);
		await expect(items.first().getByRole('link').locator('svg')).toHaveAttribute('fill', 'none');

		await expect(async () => {
			await page.getByText('Solid', { exact: true }).click();
			await expect(items.first().getByRole('link').locator('svg')).toHaveAttribute(
				'fill',
				'currentColor',
				{
					timeout: 200
				}
			);
		}).toPass();
		// the Getting started examples follow the style too
		await expect(page.getByRole('complementary')).toContainText(
			'<Icon name="beaker" class="size-6" solid />'
		);
	});

	test('filters icons by name, ignoring case, spaces and the Icon suffix', async ({ page }) => {
		const search = page.getByRole('searchbox');
		const items = grid(page).getByRole('listitem');

		for (const query of ['Arrow-Up', 'arrow up', 'ArrowUpIcon']) {
			await search.fill(query);
			await expect(items.first()).toContainText('arrow-up');
			for (const text of await items.allTextContents()) expect(text).toContain('arrow-up');
		}

		// heroicons v1 names find their renamed v2 icons
		await search.fill('logout');
		await expect(items.first()).toContainText('arrow-right-on-rectangle');

		await search.fill('(');
		await expect(page.getByText('No icons match “(”.')).toBeVisible();
		await page.getByRole('button', { name: 'Clear search' }).last().click();
		await expect(items).toHaveCount(324);
		await expect(search).toBeFocused();
	});

	test('focuses the search with the slash key', async ({ page }) => {
		// The handler is attached on hydration, so retry until the prerendered page is interactive.
		await expect(async () => {
			await page.keyboard.press('/');
			await expect(page.getByRole('searchbox')).toBeFocused({ timeout: 200 });
		}).toPass();
		await expect(page.getByRole('searchbox')).toHaveValue('');
	});

	test('shows the selected icon with its code in the side panel', async ({ page }) => {
		const panel = page.getByRole('complementary');
		await expect(panel.getByRole('heading', { name: 'Getting started' })).toBeVisible();

		await expect(async () => {
			await grid(page).getByRole('link', { name: 'beaker' }).click();
			await expect(panel.getByRole('heading', { name: 'beaker', exact: true })).toBeVisible({
				timeout: 200
			});
		}).toPass();
		await expect(page).toHaveURL(/\/$/);
		await expect(panel).toContainText('<Icon name="beaker" class="size-6" />');
		await expect(panel).toContainText('npm install @krowten/svelte-heroicons');
		await expect(panel).toContainText("import { BeakerIcon } from '@krowten/svelte-heroicons';");

		// the panel follows every new selection, not just the first
		await grid(page).getByRole('link', { name: 'bell', exact: true }).click();
		await expect(panel.getByRole('heading', { name: 'bell', exact: true })).toBeVisible();
		await expect(panel).toContainText('<Icon name="bell" class="size-6" />');

		await page.keyboard.press('Escape');
		await expect(panel.getByRole('heading', { name: 'Getting started' })).toBeVisible();

		// keyboard: Enter on a tile moves focus to the panel's copy button, Escape brings it back
		const bell = grid(page).getByRole('link', { name: 'bell', exact: true });
		await bell.focus();
		await page.keyboard.press('Enter');
		await expect(panel.locator('button[data-primary]')).toBeFocused();
		await page.keyboard.press('Escape');
		await expect(bell).toBeFocused();
	});

	test('copies the code', async ({ page, context }) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
		const panel = page.getByRole('complementary');
		await expect(async () => {
			await grid(page).getByRole('link', { name: 'bell', exact: true }).click();
			await expect(panel.getByRole('heading', { name: 'bell', exact: true })).toBeVisible({
				timeout: 200
			});
		}).toPass();

		await panel.locator('button[data-primary]').click();
		await expect(panel.getByRole('button', { name: 'Copied' })).toBeVisible();
		expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
			`import {\n\tIcon\n} from '@krowten/svelte-heroicons';\n\n<Icon name="bell" class="size-6" />`
		);
	});
});

test.describe('icon page', () => {
	test('shows both styles, the code and related icons', async ({ page }) => {
		await page.goto('/icons/arrow-up-tray');
		await expect(page).toHaveTitle(
			'Arrow up tray icon for Svelte (ArrowUpTrayIcon) | svelte-heroicons'
		);
		await expect(page.getByRole('heading', { level: 1 })).toHaveText(
			'Arrow up tray icon for Svelte'
		);
		await expect(page.getByRole('heading', { name: 'Outline' })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Solid' })).toBeVisible();
		await expect(page.getByRole('main')).toContainText(
			'<Icon name="arrow-up-tray" class="size-6" />'
		);
		await expect(page.getByRole('main')).toContainText(
			"import { ArrowUpTrayIcon } from '@krowten/svelte-heroicons';"
		);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://krowten.github.io/svelte-heroicons/icons/arrow-up-tray'
		);

		await page.getByRole('link', { name: 'arrow-down-tray' }).click();
		await expect(page).toHaveURL(/\/icons\/arrow-down-tray$/);
	});

	test('the grid links to icon pages on narrow screens', async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto('/');
		await grid(page).getByRole('link', { name: 'beaker' }).click();
		await expect(page).toHaveURL(/\/icons\/beaker$/);
	});
});

test('serves llms.txt and the sitemap', async ({ request }) => {
	const llms = await (await request.get('/llms.txt')).text();
	expect(llms).toContain('# @krowten/svelte-heroicons');
	const full = await (await request.get('/llms-full.txt')).text();
	expect(full).toContain('- arrow-up-tray → ArrowUpTrayIcon');
	const sitemap = await (await request.get('/sitemap.xml')).text();
	expect(sitemap.match(/<loc>/g)).toHaveLength(325);
});
