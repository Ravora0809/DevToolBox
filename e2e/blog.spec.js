import { test, expect } from '@playwright/test';

test.describe('Blog Articles', () => {
  test('opens blog list and renders articles correctly', async ({ page }) => {
    await page.goto('/#blog');
    await expect(page.locator('h1')).toContainText('Developer Articles & Guides');

    // Verify articles are listed
    const articleHeadings = page.locator('h2');
    await expect(articleHeadings.first()).toBeVisible();

    // Verify a specific article title
    await expect(page.locator('h2:has-text("Modern JSON Formatting")')).toBeVisible();

    // Click to open article
    await page.locator('h2:has-text("Modern JSON Formatting")').click();

    // Verify article detail rendered
    await expect(page.locator('h1')).toContainText('Modern JSON Formatting');
    await expect(page.locator('button:has-text("Back to all articles")')).toBeVisible();

    // Verify markdown content rendered
    await expect(page.locator('text=Understanding JSON Formatting and Indentation Standards')).toBeVisible();

    // Verify related tool links are visible
    await expect(page.locator('h3:has-text("Related DevToolBox Utilities")')).toBeVisible();

    // Click back to all articles
    await page.locator('button:has-text("Back to all articles")').click();
    await expect(page.locator('h1')).toContainText('Developer Articles & Guides');
  });

  test('direct navigation to blog post via hash slug works', async ({ page }) => {
    await page.goto('/#blog-modern-json-formatting-validation-guide');
    await expect(page.locator('h1')).toContainText('Modern JSON Formatting');
  });
});
