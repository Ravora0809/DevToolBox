import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navigates through all main navbar pages', async ({ page }) => {
    // 1. Navigate to All Tools
    await page.locator('nav button:has-text("All Tools")').click();
    await expect(page).toHaveURL(/#tools/);
    await expect(page.locator('h1')).toContainText('Developer Tools Directory');

    // 2. Navigate to Blog
    await page.locator('nav button:has-text("Blog")').click();
    await expect(page).toHaveURL(/#blog/);
    await expect(page.locator('h1')).toContainText('Developer Articles & Guides');

    // 3. Navigate to About
    await page.locator('nav button:has-text("About")').click();
    await expect(page).toHaveURL(/#about/);
    await expect(page.locator('h1')).toContainText('Practical Developer Utilities');

    // 4. Navigate to Contact
    await page.locator('nav button:has-text("Contact")').click();
    await expect(page).toHaveURL(/#contact/);
    await expect(page.locator('h1')).toContainText('Contact & Tool Feedback');

    // 5. Navigate back to Home
    await page.locator('nav button:has-text("Home")').click();
    await expect(page).toHaveURL(/#home/);
    await expect(page.locator('h1')).toContainText('Every Developer Tool');
  });

  test('navigates through legal footer pages (Privacy, Terms, Disclaimer)', async ({ page }) => {
    // 1. Privacy Policy
    await page.locator('footer button:has-text("Privacy Policy")').click();
    await expect(page).toHaveURL(/#privacy/);
    await expect(page.locator('h1')).toContainText('Privacy Policy');
    await expect(page.locator('text=Overview and Core Architecture')).toBeVisible();

    // 2. Terms of Service
    await page.locator('footer button:has-text("Terms of Service")').click();
    await expect(page).toHaveURL(/#terms/);
    await expect(page.locator('h1')).toContainText('Terms of Service');
    await expect(page.locator('text=Acceptance of Terms')).toBeVisible();

    // 3. Disclaimer
    await page.locator('footer button:has-text("Disclaimer")').click();
    await expect(page).toHaveURL(/#disclaimer/);
    await expect(page.locator('h1')).toContainText('Website & Tool Disclaimer');
    await expect(page.locator('text=Informational and Utility Purpose Only')).toBeVisible();

    // 4. Back to Home button works from legal page
    await page.locator('button:has-text("Back to Home")').click();
    await expect(page).toHaveURL(/#home/);
    await expect(page.locator('h1')).toContainText('Every Developer Tool');
  });

  test('clicking brand logo returns to Home page', async ({ page }) => {
    // Navigate away to Tools
    await page.locator('nav button:has-text("All Tools")').click();
    await expect(page).toHaveURL(/#tools/);

    // Click Brand logo in header
    await page.locator('header div.cursor-pointer:has-text("DevToolBox")').click();
    await expect(page).toHaveURL(/#home/);
    await expect(page.locator('h1')).toContainText('Every Developer Tool');
  });
});
