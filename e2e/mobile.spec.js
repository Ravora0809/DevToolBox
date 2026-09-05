import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE viewport

  test('toggles mobile menu and navigates between pages', async ({ page }) => {
    await page.goto('/');

    const menuToggle = page.locator('button[aria-label="Toggle menu"]');
    await expect(menuToggle).toBeVisible();

    // 1. Open mobile menu
    await menuToggle.click();

    // Verify mobile navigation links are visible
    const allToolsLink = page.locator('button:has-text("All Developer Tools")');
    await expect(allToolsLink).toBeVisible();

    // 2. Click 'All Developer Tools'
    await allToolsLink.click();
    await expect(page).toHaveURL(/#tools/);
    await expect(page.locator('h1')).toContainText('Developer Tools Directory');
    // Mobile menu should automatically close after navigation
    await expect(allToolsLink).not.toBeVisible();

    // 3. Open mobile menu again and navigate to Articles
    await menuToggle.click();
    const blogLink = page.getByRole('banner').getByRole('button', { name: 'Developer Articles & Guides' });
    await expect(blogLink).toBeVisible();
    await blogLink.click();
    await expect(page).toHaveURL(/#blog/);
    await expect(page.locator('h1')).toContainText('Developer Articles & Guides');

    // 4. Navigate to About
    await menuToggle.click();
    await page.getByRole('banner').getByRole('button', { name: 'About & Architecture' }).click();
    await expect(page).toHaveURL(/#about/);
    await expect(page.locator('h1')).toContainText('Practical Developer Utilities');

    // 5. Navigate to Contact
    await menuToggle.click();
    await page.getByRole('banner').getByRole('button', { name: 'Request a Tool / Feedback' }).click();
    await expect(page).toHaveURL(/#contact/);
    await expect(page.locator('h1')).toContainText('Contact & Tool Feedback');
  });
});
