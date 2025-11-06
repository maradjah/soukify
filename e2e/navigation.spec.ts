import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate through main pages', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page).toHaveURL('/');

    // Navigate to artisans
    await page.click('a[href="/artisans"]');
    await expect(page).toHaveURL('/artisans');

    // Navigate to products
    await page.click('a[href="/products"]');
    await expect(page).toHaveURL('/products');

    // Navigate to about
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL('/about');

    // Go back home via logo
    await page.click('a[href="/"]');
    await expect(page).toHaveURL('/');
  });

  test('should have functional footer links', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check footer links
    await expect(page.locator('footer').getByText(/Browse Artisans/i)).toBeVisible();
    await expect(page.locator('footer').getByText(/Shop Products/i)).toBeVisible();
    await expect(page.locator('footer').getByText(/About Us/i)).toBeVisible();
    await expect(page.locator('footer').getByText(/Contact/i)).toBeVisible();
  });

  test('should display mobile menu on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile menu button should be visible
    const menuButton = page.locator('button').filter({ hasText: /menu/i });
    await expect(menuButton).toBeVisible();

    // Click menu button
    await menuButton.click();

    // Menu items should appear
    await expect(page.getByRole('link', { name: /Artisans/i })).toBeVisible();
  });

  test('should show cart icon', async ({ page }) => {
    await page.goto('/');

    // Cart icon should be visible
    const cartLink = page.locator('a[href="/cart"]');
    await expect(cartLink).toBeVisible();
  });

  test('should navigate to cart page', async ({ page }) => {
    await page.goto('/');

    await page.click('a[href="/cart"]');

    await expect(page).toHaveURL('/cart');
    await expect(
      page.getByRole('heading', { name: /Shopping Cart|Your cart is empty/i })
    ).toBeVisible();
  });
});
