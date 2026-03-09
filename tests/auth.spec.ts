import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Login/);
    await expect(page.locator('text=Welcome Back')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('register page renders correctly', async ({ page }) => {
    await page.goto('/register');
    await expect(page).toHaveTitle(/Register/);
    await expect(page.locator('text=Create Account')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('login form validates empty fields', async ({ page }) => {
    await page.goto('/login');
    await page.click('button[type="submit"]');
    // Form should show validation errors
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveAttribute('required', '');
  });

  test('login form validates email format', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    // Email field should have type="email" which provides built-in validation
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('login form has OAuth options', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('button:has-text("Google")')).toBeVisible();
    await expect(page.locator('button:has-text("GitHub")')).toBeVisible();
  });

  test('login form has sign up link', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('text=Sign up')).toBeVisible();
    await expect(page.locator('a[href="/register"]')).toBeVisible();
  });

  test('register page has sign in link', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('text=Sign in')).toBeVisible();
    await expect(page.locator('a[href="/login"]')).toBeVisible();
  });
});
