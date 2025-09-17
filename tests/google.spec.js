// tests/google.spec.js
const { test, expect } = require('@playwright/test');

test('Google homepage has title', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});

test('Google search works', async ({ page }) => {
  await page.goto('https://www.google.com');

  // Handle cookie consent popup if present
  const consentButton = page.locator('button:has-text("I agree"), button:has-text("Accept all")');
  if (await consentButton.isVisible().catch(() => false)) {
    await consentButton.click();
  }

  // Google now uses a <textarea> for the search box, fallback to input
  const searchBox = page.locator('textarea[name="q"], input[name="q"]');
  await searchBox.waitFor({ state: 'visible', timeout: 10000 }); // wait max 10s
  await searchBox.fill('Playwright');
  await searchBox.press('Enter');

  // Wait for results to appear
  await page.waitForSelector('h3', { timeout: 15000 });

  // Assert first result contains 'Playwright'
  const firstResult = await page.locator('h3').first().innerText();
  expect(firstResult).toMatch(/Playwright/i);
});
