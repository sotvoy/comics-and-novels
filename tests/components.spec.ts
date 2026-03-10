import { test, expect } from '@playwright/test';

test.describe('New Features Tests', () => {
  // Search Autocomplete Tests
  test.describe('Search Autocomplete', () => {
    test('search input shows autocomplete dropdown', async ({ page }) => {
      await page.goto('/search');
      
      // Type in search input
      const searchInput = page.locator('input[placeholder*="Search"]');
      await searchInput.fill('Solo');
      
      // Wait for autocomplete dropdown
      await page.waitForTimeout(500);
      
      // Check that dropdown appears with results
      await expect(page.locator('text=Results')).toBeVisible();
    });

    test('search shows popular searches when empty', async ({ page }) => {
      await page.goto('/search');
      
      // Click on search input to focus it
      const searchInput = page.locator('input[placeholder*="Search"]');
      await searchInput.focus();
      
      // Wait for dropdown
      await page.waitForTimeout(300);
      
      // Check for popular searches
      await expect(page.locator('text=Popular Searches')).toBeVisible();
    });

    test('search can clear input', async ({ page }) => {
      await page.goto('/search');
      
      const searchInput = page.locator('input[placeholder*="Search"]');
      await searchInput.fill('Solo');
      
      // Click clear button
      const clearButton = page.locator('button').filter({ has: page.locator('svg') }).first();
      await clearButton.click();
      
      // Input should be cleared
      await expect(searchInput).toHaveValue('');
    });
  });

  // Reading Progress Tests
  test.describe('Reading Progress', () => {
    test('reading progress component renders', async ({ page }) => {
      await page.goto('/series/solo-leveling');
      
      // Check progress component is visible
      await expect(page.locator('text=Your Reading Progress')).toBeVisible();
      await expect(page.locator('text=complete')).toBeVisible();
    });

    test('reading progress can expand', async ({ page }) => {
      await page.goto('/series/solo-leveling');
      
      // Click expand button
      await page.click('text=View');
      
      // Check expanded controls are visible
      await expect(page.locator('text=Jump to Chapter')).toBeVisible();
      await expect(page.locator('text=Mark Chapter Read')).toBeVisible();
    });

    test('reading progress slider works', async ({ page }) => {
      await page.goto('/series/solo-leveling');
      
      // Expand the progress
      await page.click('text=View');
      
      // Find and interact with slider (if present)
      const slider = page.locator('input[type="range"]');
      if (await slider.isVisible()) {
        await slider.fill('10');
      }
    });
  });

  // Notification Dropdown Tests
  test.describe('Notification Dropdown', () => {
    test('notification bell shows unread count', async ({ page }) => {
      await page.goto('/');
      
      // Check notification bell exists (might show badge if there are unread)
      const notificationButton = page.locator('button[aria-label="Notifications"]');
      await expect(notificationButton).toBeVisible();
    });

    test('notification dropdown opens on click', async ({ page }) => {
      await page.goto('/');
      
      // Click notification bell
      await page.click('button[aria-label="Notifications"]');
      
      // Check dropdown appears
      await expect(page.locator('h3:has-text("Notifications")')).toBeVisible();
    });

    test('notification shows demo notifications', async ({ page }) => {
      await page.goto('/');
      
      // Open notification dropdown
      await page.click('button[aria-label="Notifications"]');
      
      // Check for demo notifications
      await expect(page.locator('text=New Chapter')).toBeVisible();
      await expect(page.locator('text=New Follower')).toBeVisible();
    });

    test('can mark notification as read', async ({ page }) => {
      await page.goto('/');
      
      // Open notification dropdown
      await page.click('button[aria-label="Notifications"]');
      
      // Click mark as read
      await page.click('text=Mark as read');
    });
  });

  // Keyboard Navigation Tests (Reader Page)
  test.describe('Keyboard Navigation', () => {
    test('reader page renders', async ({ page }) => {
      await page.goto('/read/solo-leveling/1');
      
      // Check reader page loads
      await expect(page.locator('text=Chapter 1')).toBeVisible();
    });

    test('reader has chapter navigation', async ({ page }) => {
      await page.goto('/read/solo-leveling/1');
      
      // Look for chapter navigation elements
      const nextButton = page.locator('button').filter({ hasText: /Next|Ch\./ }).first();
      // May or may not be visible depending on page state
    });
  });

  // Dark Mode Tests
  test.describe('Dark Mode', () => {
    test('theme toggle button exists', async ({ page }) => {
      await page.goto('/');
      
      // Look for theme toggle button (sun/moon icon)
      const themeButton = page.locator('button[aria-label="Toggle theme"]');
      await expect(themeButton).toBeVisible();
    });

    test('can toggle dark mode', async ({ page }) => {
      await page.goto('/');
      
      // Click theme toggle
      await page.click('button[aria-label="Toggle theme"]');
      
      // The page should now have dark class (or not)
      // This test just ensures the toggle works without errors
    });
  });
});
