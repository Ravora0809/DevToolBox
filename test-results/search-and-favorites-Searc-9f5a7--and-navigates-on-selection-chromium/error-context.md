# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search-and-favorites.spec.js >> Search and Favorites >> Command palette search opens, filters tools, and navigates on selection
- Location: e2e/search-and-favorites.spec.js:11:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Search and Favorites', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Clear localStorage before each test
> 6  |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  7  |     await page.evaluate(() => localStorage.clear());
  8  |     await page.reload();
  9  |   });
  10 | 
  11 |   test('Command palette search opens, filters tools, and navigates on selection', async ({ page }) => {
  12 |     // Open command palette via search button in navbar
  13 |     const searchBtn = page.locator('header button:has-text("Search")');
  14 |     await searchBtn.click();
  15 | 
  16 |     // Verify modal is open
  17 |     const paletteInput = page.locator('input[placeholder*="Type a tool name, category, or keyword"]');
  18 |     await expect(paletteInput).toBeVisible();
  19 | 
  20 |     // Type query
  21 |     await paletteInput.fill('password');
  22 | 
  23 |     // Verify filtered result item appears
  24 |     const resultItem = page.locator('div:has-text("Password Generator")').last();
  25 |     await expect(resultItem).toBeVisible();
  26 | 
  27 |     // Click result item
  28 |     await resultItem.click();
  29 | 
  30 |     // Verify navigation occurred to Password Generator
  31 |     await expect(page).toHaveURL(/#tool-password-generator/);
  32 |     await expect(page.locator('h1')).toContainText('Password Generator');
  33 |   });
  34 | 
  35 |   test('Homepage search filters tools dynamically', async ({ page }) => {
  36 |     const homeSearch = page.locator('input[placeholder="Filter tools..."]');
  37 |     await homeSearch.fill('timestamp');
  38 | 
  39 |     await expect(page.locator('h3:has-text("Unix Timestamp Converter")')).toBeVisible();
  40 |     await expect(page.locator('h3:has-text("JSON Formatter")')).not.toBeVisible();
  41 | 
  42 |     await homeSearch.fill('');
  43 |     await expect(page.locator('h3:has-text("JSON Formatter")')).toBeVisible();
  44 |   });
  45 | 
  46 |   test('Favorites can be added, persisted in localStorage, and accessed from navbar', async ({ page }) => {
  47 |     // Go to tool detail page (word-counter is not in initial favorites)
  48 |     await page.goto('/#tool-word-counter');
  49 |     await expect(page.locator('h1')).toContainText('Word & Character Counter');
  50 | 
  51 |     // Click "Favorite" button
  52 |     const favBtn = page.locator('button:has-text("Favorite")');
  53 |     await favBtn.click();
  54 | 
  55 |     // Button should now say "Starred"
  56 |     await expect(page.getByRole('button', { name: 'Starred', exact: true })).toBeVisible();
  57 | 
  58 |     // Verify localStorage has word-counter
  59 |     const storedFavs = await page.evaluate(() => localStorage.getItem('devtoolbox_favorites'));
  60 |     expect(storedFavs).toContain('word-counter');
  61 | 
  62 |     // Check navbar displays Starred count pill (on larger screen)
  63 |     const navbarStarred = page.locator('header button:has-text("Starred")');
  64 |     await expect(navbarStarred).toBeVisible();
  65 | 
  66 |     // Click dropdown and verify link
  67 |     await navbarStarred.click();
  68 |     await expect(page.locator('text=Quick Favorites')).toBeVisible();
  69 | 
  70 |     // Toggle unstar
  71 |     await page.getByRole('button', { name: 'Starred', exact: true }).click();
  72 |     await expect(page.getByRole('button', { name: 'Favorite', exact: true })).toBeVisible();
  73 |   });
  74 | });
  75 | 
```