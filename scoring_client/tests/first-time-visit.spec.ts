import {test, expect} from '@playwright/test';

test('should display privacy page with root url', async ({page}) => {
  await page.goto('/');
  const privacyMessage = page.locator('text=Privacy notice');
  await expect(privacyMessage).toBeVisible();
});

test('should display privacy page with another url', async ({page}) => {
  await page.goto('/client/wizard');
  const privacyMessage = page.locator('text=Privacy notice');
  await expect(privacyMessage).toBeVisible();
});

test('should contain a single button', async ({page}) => {
  await page.goto('/');
  const button = page.locator('button');
  await expect(button).toHaveCount(1);
});

test('should show main page after click', async ({page}) => {
  await page.goto('/');
  const button = page.locator('button');
  await button.click();
  await expect(page.getByRole('heading', {name: 'Trackscore.nl'})).toBeVisible();
});

test('should have set visitFirstPage in main store', async ({page}) => {
  await page.goto('/');
  const button = page.locator('button');
  await button.click();
  await expect.poll(async () => {
    const raw = await page.evaluate(() => {
      return window.localStorage.getItem('main');
    });
    return raw ? JSON.parse(raw) : null;
  }).toEqual({
    state: expect.objectContaining({
      firstVisitPage: true,
    }),
    // default Zustand version
    version: 0,
  });
});

test('should show dice page after click', async ({page}) => {
  await page.goto('/client/dice');
  const privacyMessage = page.locator('text=Privacy notice');
  await expect(privacyMessage).toBeVisible();
  const button = page.locator('button');
  await button.click();
  // url should be unchanged
  await expect(page).toHaveURL('/client/dice');
  // but should now show the actually dice page
  await expect(page.getByRole('heading', {name: 'Dice'})).toBeVisible();
});

