// tests/google.spec.js
const { test, expect } = require('@playwright/test');

test('Google homepage has title', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});

test('Google search works', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.fill('input[name="q"]', 'Playwright');
  await page.keyboard.press('Enter');
  await page.waitForSelector('#search');
  const results = await page.locator('#search').innerText();
  expect(results).toContain('Playwright');
});
