// tests/login.spec.js
const { test, expect } = require('@playwright/test');

const baseURL = 'https://practicetestautomation.com';
const loginPath = '/practice-test-login/';

test.describe('PracticeTestAutomation Login Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL + loginPath);
  });

  test('All login fields are visible', async ({ page }) => {
    await expect(page.locator('input#username')).toBeVisible();
    await expect(page.locator('input#password')).toBeVisible();
    await expect(page.locator('button#submit')).toBeVisible();
  });

  test('Successful login with correct credentials', async ({ page }) => {
    await page.fill('input#username', 'student');
    await page.fill('input#password', 'Password123');
    await page.click('button#submit');
    // After successful login, you are redirected to a page “Logged In Successfully” or similar
    await expect(page).toHaveURL(/.*logged-in-successfully/);
    // Or check for logout button
    await expect(page.locator('text=Log out')).toBeVisible();
  });

  test('Login fails with wrong username', async ({ page }) => {
    await page.fill('input#username', 'wrongUser');
    await page.fill('input#password', 'Password123');
    await page.click('button#submit');
    await expect(page.locator('text=Your username is invalid!')).toBeVisible();
  });

  test('Login fails with wrong password', async ({ page }) => {
    await page.fill('input#username', 'student');
    await page.fill('input#password', 'WrongPassword');
    await page.click('button#submit');
    await expect(page.locator('text=Your password is invalid!')).toBeVisible();
  });

  test('Login fails with empty fields', async ({ page }) => {
    await page.click('button#submit');
    await expect(page.locator('text=Your username is invalid!')).toBeVisible();
  });

});
