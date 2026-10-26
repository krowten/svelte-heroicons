import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('shows every icon in both variants', async ({ page }) => {
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(/heroicons\s+for Svelte/);
	const outline = page.locator('section').first().getByRole('listitem');
	const solid = page.locator('section').last().getByRole('listitem');
	await expect(outline).toHaveCount(324);
	await expect(solid).toHaveCount(324);
	await expect(outline.first().locator('svg')).toHaveAttribute('fill', 'none');
	await expect(solid.first().locator('svg')).toHaveAttribute('fill', 'currentColor');
});

test('filters icons by name', async ({ page }) => {
	const search = page.getByRole('searchbox');
	await search.fill('Arrow-Up');
	const items = page.locator('section').first().getByRole('listitem');
	await expect(items.first()).toContainText('arrow-up');
	for (const text of await items.allTextContents()) expect(text).toContain('arrow-up');

	await search.fill('(');
	await expect(page.getByText('No icons match “(”.').first()).toBeVisible();
});

test('focuses the search with the slash key', async ({ page }) => {
	// The handler is attached on hydration, so retry until the prerendered page is interactive.
	await expect(async () => {
		await page.keyboard.press('/');
		await expect(page.getByRole('searchbox')).toBeFocused({ timeout: 200 });
	}).toPass();
	await expect(page.getByRole('searchbox')).toHaveValue('');
});
