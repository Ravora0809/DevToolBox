import { test, expect } from '@playwright/test';

test.describe('Search and Favorites', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('Command palette search opens, filters tools, and navigates on selection', async ({ page }) => {
    // Open command palette via search button in navbar
    const searchBtn = page.locator('header button:has-text("Search")');
    await searchBtn.click();

    // Verify modal is open
    const paletteInput = page.locator('input[placeholder*="Type a tool name, category, or keyword"]');
    await expect(paletteInput).toBeVisible();

    // Type query
    await paletteInput.fill('password');

    // Verify filtered result item appears
    const resultItem = page.locator('div:has-text("Password Generator")').last();
    await expect(resultItem).toBeVisible();

    // Click result item
    await resultItem.click();

    // Verify navigation occurred to Password Generator
    await expect(page).toHaveURL(/#tool-password-generator/);
    await expect(page.locator('h1')).toContainText('Password Generator');
  });

  test('Homepage search filters tools dynamically', async ({ page }) => {
    const homeSearch = page.locator('input[placeholder="Filter tools..."]');
    await homeSearch.fill('timestamp');

    await expect(page.locator('h3:has-text("Unix Timestamp Converter")')).toBeVisible();
    await expect(page.locator('h3:has-text("JSON Formatter")')).not.toBeVisible();

    await homeSearch.fill('');
    await expect(page.locator('h3:has-text("JSON Formatter")')).toBeVisible();
  });

  test('Favorites can be added, persisted in localStorage, and accessed from navbar', async ({ page }) => {
    // Go to tool detail page (word-counter is not in initial favorites)
    await page.goto('/#tool-word-counter');
    await expect(page.locator('h1')).toContainText('Word & Character Counter');

    // Click "Favorite" button
    const favBtn = page.locator('button:has-text("Favorite")');
    await favBtn.click();

    // Button should now say "Starred"
    await expect(page.getByRole('button', { name: 'Starred', exact: true })).toBeVisible();

    // Verify localStorage has word-counter
    const storedFavs = await page.evaluate(() => localStorage.getItem('devtoolbox_favorites'));
    expect(storedFavs).toContain('word-counter');

    // Check navbar displays Starred count pill (on larger screen)
    const navbarStarred = page.locator('header button:has-text("Starred")');
    await expect(navbarStarred).toBeVisible();

    // Click dropdown and verify link
    await navbarStarred.click();
    await expect(page.locator('text=Quick Favorites')).toBeVisible();

    // Toggle unstar
    await page.getByRole('button', { name: 'Starred', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Favorite', exact: true })).toBeVisible();
  });
});
