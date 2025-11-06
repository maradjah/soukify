import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');

    await expect(
      page.getByRole('heading', { name: /Welcome Back/i })
    ).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/Password/i)).toBeVisible();
    await expect(
      page.getByRole('button', { name: /Sign In/i })
    ).toBeVisible();
  });

  test('should display register page', async ({ page }) => {
    await page.goto('/register');

    await expect(
      page.getByRole('heading', { name: /Create Account/i })
    ).toBeVisible();
    await expect(page.getByLabel(/Full Name/i)).toBeVisible();
    await expect(page.getByLabel(/Email/i)).toBeVisible();
    await expect(page.getByLabel(/^Password$/i)).toBeVisible();
    await expect(page.getByLabel(/Confirm Password/i)).toBeVisible();
  });

  test('should toggle between buyer and artisan registration', async ({
    page,
  }) => {
    await page.goto('/register');

    // Check default state (might be buyer)
    const buyerButton = page.getByRole('button', { name: /^Buyer$/i });
    const artisanButton = page.getByRole('button', { name: /^Artisan$/i });

    await expect(buyerButton).toBeVisible();
    await expect(artisanButton).toBeVisible();

    // Click artisan button
    await artisanButton.click();

    // Check that description changed
    await expect(
      page.getByText(/Join as an artisan and sell your products/i)
    ).toBeVisible();

    // Click buyer button
    await buyerButton.click();

    await expect(
      page.getByText(/Join to discover amazing handcrafted products/i)
    ).toBeVisible();
  });

  test('should have link to register from login', async ({ page }) => {
    await page.goto('/login');

    const registerLink = page.getByRole('link', { name: /Sign Up/i });
    await expect(registerLink).toBeVisible();

    await registerLink.click();

    await expect(page).toHaveURL('/register');
  });

  test('should have link to login from register', async ({ page }) => {
    await page.goto('/register');

    const loginLink = page.getByRole('link', { name: /Sign In/i });
    await expect(loginLink).toBeVisible();

    await loginLink.click();

    await expect(page).toHaveURL('/login');
  });
});
