import { test, expect } from '@playwright/test';

test.describe('API Endpoints', () => {
  test('series API returns data', async ({ request }) => {
    const response = await request.get('/api/series');
    expect(response.ok()).toBeTruthy();
  });

  test('genres API returns data', async ({ request }) => {
    const response = await request.get('/api/genres');
    expect(response.ok()).toBeTruthy();
  });

  test('rankings API returns data', async ({ request }) => {
    const response = await request.get('/api/rankings');
    expect(response.ok()).toBeTruthy();
  });

  test('search API works', async ({ request }) => {
    const response = await request.get('/api/search?q=test');
    expect(response.ok()).toBeTruthy();
  });

  test('protected routes redirect unauthenticated users', async ({ page }) => {
    // Creator route should redirect to login
    await page.goto('/creator');
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('settings route redirects unauthenticated users', async ({ page }) => {
    await page.goto('/settings');
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('profile route redirects unauthenticated users', async ({ page }) => {
    await page.goto('/profile');
    await expect(page).toHaveURL(/.*\/login/);
  });
});
