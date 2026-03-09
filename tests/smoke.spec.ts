import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('home page renders correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/C&N/);
    await expect(page.locator('text=C&N')).toBeVisible();
  });

  test('category pills are visible and clickable', async ({ page }) => {
    await page.goto('/');
    // Check category pills exist
    await expect(page.locator('text=All')).toBeVisible();
    await expect(page.locator('text=Publish Art')).toBeVisible();
    await expect(page.locator('text=Write Stories')).toBeVisible();
  });

  test('search page works with genre filter', async ({ page }) => {
    await page.goto('/search?genre=action');
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test('publish-art page renders', async ({ page }) => {
    await page.goto('/publish-art');
    await expect(page.locator('text=Publish Art')).toBeVisible();
    await expect(page.locator('text=+ Upload Art')).toBeVisible();
  });

  test('write-stories page renders', async ({ page }) => {
    await page.goto('/write-stories');
    await expect(page.locator('text=Write Stories')).toBeVisible();
    await expect(page.locator('text=+ New Story')).toBeVisible();
  });

  test('shorts page renders', async ({ page }) => {
    await page.goto('/shorts');
    await expect(page.locator('text=Shorts')).toBeVisible();
  });

  test('comics page renders', async ({ page }) => {
    await page.goto('/comics');
    await expect(page.locator('text=Comics')).toBeVisible();
  });

  test('novels page renders', async ({ page }) => {
    await page.goto('/novels');
    await expect(page.locator('text=Novels')).toBeVisible();
  });
});
