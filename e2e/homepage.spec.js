import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads successfully with header, hero, and features', async ({ page }) => {
    await page.goto('/');

    // Page title and brand
    await expect(page).toHaveTitle(/DevToolBoox/i);
    await expect(page.locator('header')).toContainText('DevToolBoox');

    // Hero section
    await expect(page.locator('h1')).toContainText('Every Developer Tool');
    await expect(page.locator('text=Fast Execution. Developer First.')).toBeVisible();

    // Trending pills are visible and clickable
    const trendingPills = page.locator('button:has-text("JSON"), button:has-text("Regex")');
    await expect(trendingPills.first()).toBeVisible();

    // Tools explorer section
    await expect(page.locator('h2:has-text("Explore Developer Utilities")')).toBeVisible();

    // Verify presence of core tool cards on homepage
    await expect(page.locator('h3:has-text("JSON Formatter")')).toBeVisible();
    await expect(page.locator('h3:has-text("Regex Tester & Debugger")')).toBeVisible();
    await expect(page.locator('h3:has-text("UUID / GUID Generator")')).toBeVisible();

    // Footer is present
    await expect(page.locator('footer')).toContainText('DevToolBoox');
  });

  test('filters tools by category on homepage', async ({ page }) => {
    await page.goto('/');

    // Click 'Security' category pill
    const securityBtn = page.locator('section button:has-text("Security")');
    await securityBtn.click();

    // Verify security tools are displayed
    await expect(page.locator('h3:has-text("Password Generator")')).toBeVisible();
    // Non-security tools like JSON Formatter should not be visible in this category
    await expect(page.locator('h3:has-text("JSON Formatter")')).not.toBeVisible();

    // Click 'All Tools' to reset category
    await page.locator('section button:has-text("All Tools")').click();
    await expect(page.locator('h3:has-text("JSON Formatter")')).toBeVisible();
  });
});
