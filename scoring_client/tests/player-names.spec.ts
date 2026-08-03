import {test, expect} from '@playwright/test';
import {setupLocalStorage} from "./setupLocalStorage";

test.beforeEach(async ({page}) => {
  // Setup local storage before each test
  await setupLocalStorage(page);
  // starting page
  await page.goto('/client/');
});

test('player names should be stored across different games', async ({page}) => {
  await page.getByRole('button', { name: 'Individual Individual General' }).click();
  await page.getByRole('link', { name: 'Add players' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Player 1');
  await page.getByRole('textbox').press('Enter');
  await page.getByRole('textbox').nth(1).fill('Player 2');
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByRole('textbox').nth(2).fill('Player 3');
  await page.getByRole('link', { name: 'Close' }).click();
  await page.locator('button[class*="button--is-icon"]').first().click();
  await page.getByRole('button', { name: 'Wizard Wizard Scoring for' }).click();
  await page.getByRole('link', { name: 'Enter players' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button').nth(1).click();
  await expect(page.getByRole('button', { name: 'Player 1' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Player 2' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Player 3' })).toBeVisible();
});

test('additional player names should be stored across different games', async ({page}) => {
  await page.getByRole('button', { name: 'Individual Individual General' }).click();
  await page.getByRole('link', { name: 'Add players' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Player 1');
  await page.getByRole('textbox').press('Enter');
  await page.getByRole('textbox').nth(1).fill('Player 2');
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByRole('textbox').nth(2).fill('Player 3');
  await page.getByRole('link', { name: 'Close' }).click();
  await page.locator('button[class*="button--is-icon"]').first().click();
  await page.getByRole('button', { name: 'Wizard Wizard Scoring for' }).click();
  await page.getByRole('link', { name: 'Enter players' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Player 1' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('Player 4');
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByRole('textbox').nth(2).fill('Player 5');
  await page.getByRole('button').first().click();
  await page.locator('button[class*="button--is-icon"]').first().click();
  await page.getByRole('button', { name: 'Individual Individual General' }).click();
  await page.getByRole('link', { name: 'Add players' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button').nth(1).click();
  await expect(page.getByRole('button', { name: 'Player 1' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Player 2' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Player 3' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Player 4' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Player 5' })).toBeVisible();
});
