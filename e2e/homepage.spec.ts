import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display the homepage correctly', async ({ page }) => {
    await page.goto('/');

    // Check hero section
    await expect(
      page.getByRole('heading', {
        name: /Discover Authentic Moroccan Craftsmanship/i,
      })
    ).toBeVisible();

    // Check navigation
    await expect(page.getByRole('link', { name: /Soukify/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Artisans/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Products/i })).toBeVisible();
  });

  test('should navigate to artisans page', async ({ page }) => {
    await page.goto('/');

    await page.click('text=Explore Artisans');

    await expect(page).toHaveURL('/artisans');
    await expect(
      page.getByRole('heading', { name: /Moroccan Artisans/i })
    ).toBeVisible();
  });

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/');

    await page.click('text=Shop Products');

    await expect(page).toHaveURL('/products');
    await expect(
      page.getByRole('heading', { name: /Handcrafted Products/i })
    ).toBeVisible();
  });

  test('should show login link when not authenticated', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: /Login/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Sign Up/i })).toBeVisible();
  });

  test('should display category buttons', async ({ page }) => {
    await page.goto('/');

    // Check if category section is visible
    await expect(
      page.getByRole('heading', { name: /Shop by Category/i })
    ).toBeVisible();

    // Check for some categories
    await expect(page.getByText('Pottery')).toBeVisible();
    await expect(page.getByText('Textiles')).toBeVisible();
    await expect(page.getByText('Jewelry')).toBeVisible();
  });
});
