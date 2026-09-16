import { test, expect } from '@playwright/test';

test.describe('Tools Directory', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#tools');
    await expect(page.locator('h1')).toContainText('Developer Tools Directory');
  });

  test('displays all developer utilities and category filters', async ({ page }) => {
    // Check key utilities are rendered
    await expect(page.locator('h3:has-text("JSON Formatter")')).toBeVisible();
    await expect(page.locator('h3:has-text("Base64 Encoder")').first()).toBeVisible();
    await expect(page.locator('h3:has-text("Word & Character Counter")')).toBeVisible();
    await expect(page.locator('h3:has-text("Unix Timestamp Converter")')).toBeVisible();

    // Verify category filtering
    const encodersBtn = page.locator('button:has-text("Encoders & Decoders")');
    await encodersBtn.click();

    await expect(page.locator('h3:has-text("Base64 Encoder")').first()).toBeVisible();
    await expect(page.locator('h3:has-text("URL Encoder")')).toBeVisible();
    await expect(page.locator('h3:has-text("JSON Formatter")')).not.toBeVisible();
  });

  test('search input filters tools by query in tools directory', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search all utilities..."]');
    await searchInput.fill('uuid');

    await expect(page.locator('h3:has-text("UUID / GUID Generator")')).toBeVisible();
    await expect(page.locator('h3:has-text("JSON Formatter")')).not.toBeVisible();

    // Clear search
    await searchInput.fill('');
    await expect(page.locator('h3:has-text("JSON Formatter")')).toBeVisible();
  });

  test('clicking a tool card navigates to the tool detail view', async ({ page }) => {
    const card = page.locator('h3:has-text("JSON Formatter")');
    await card.click();

    await expect(page).toHaveURL(/#tool-json-formatter/);
    await expect(page.locator('h1')).toContainText('JSON Formatter');
    await expect(page.locator('textarea[placeholder*="Paste your unformatted JSON"]')).toBeVisible();
  });
});
