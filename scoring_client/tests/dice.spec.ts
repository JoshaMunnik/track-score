import {test, expect} from '@playwright/test';
import {setupLocalStorage} from "./setupLocalStorage";

test.beforeEach(async ({page}) => {
  // Setup local storage before each test
  await setupLocalStorage(page);
  // starting page
  await page.goto('/client/dice');
});

test('should navigate to Dice home page and display initial state', async ({page}) => {
  // Check that we're on the Dice home page
  await expect(page).toHaveURL(/\/dice$/);

  // Check for the "Start" button in initial state
  await expect(page.getByRole('button', {name: 'Start'})).toBeVisible();

  // Check that no dice are displayed initially
  const diceElements = page.locator('div[class*="die__container"]');
  await expect(diceElements).toHaveCount(0);
});

test('should be able to start rolling dice', async ({page}) => {
  // Click the Start button
  await page.getByRole('button', {name: 'Start'}).click();

  // Check that we're now in the rolling state
  const rollButton = page.getByRole('button', {name: 'Roll'});
  await expect(rollButton).toBeVisible();

  const stopButton = page.getByRole('button', {name: 'Stop'});
  await expect(stopButton).toBeVisible();

  // Check that dice are displayed after starting
  const diceElements = page.locator('div[class*="die__container"]');
  await expect(diceElements).toHaveCount(1); // Default dice count

  // Check for the presence of die elements
  const dieLabels = page.getByText(/die \d+/);
  await expect(dieLabels).toHaveCount(1);
});

test('should be able to roll dice', async ({page}) => {
  // Start rolling first
  await page.getByRole('button', {name: 'Start'}).click();

  // Click Roll button
  await page.getByRole('button', {name: 'Roll'}).click();

  // Wait a bit for the roll to complete and check that dice have updated values
  const dieElements = page.locator('div[class*="die__container"]');
  await expect(dieElements).toHaveCount(1);
});

test('should be able to stop rolling', async ({page}) => {
  // Start rolling first
  await page.getByRole('button', {name: 'Start'}).click();

  // Click Stop button
  await page.getByText('Stop').click();

  // Should return to initial state with "Start" button
  const startButton = page.getByText('Start');
  await expect(startButton).toBeVisible();
});

test('should navigate to Dice settings page', async ({page}) => {
  // Click the settings button (assuming it's available in the header or similar)
  await page.getByRole('link', {name: 'Settings'}).click();

  // Check that we're on the settings page
  await expect(page).toHaveURL(/\/client\/dice\/settings$/);

  // Check for configuration form elements
  const configurationForm = page.locator('div[class*="configuration-form"]');
  await expect(configurationForm).toBeVisible();

  // Check for dice configuration form
  const diceConfigurationForm = page.locator('div[class*="dice-configuration-form"]');
  await expect(diceConfigurationForm).toBeVisible();
});

test('should be able to configure dice settings', async ({page}) => {
  // Navigate to settings
  await page.getByRole('link', {name: 'Settings'}).click();

  // Check that we can see configuration options
  const diceCountInput = page.getByLabel('Dice count');
  await expect(diceCountInput).toBeVisible();

  const showTotalToggle = page.getByLabel('Show dice with total');
  await expect(showTotalToggle).toBeVisible();

  const useGroupsToggle = page.getByLabel('Fair rolls');
  await expect(useGroupsToggle).toBeVisible();
});

test('check fair rolling with 2 dice and 2 groups', async ({page}) => {
  // create a setting for 2 dice using fair rolling with 2 groups
  await page.getByRole('link').click();
  await page.getByRole('button').nth(2).click();
  await page.locator('span').click();
  await page.getByRole('spinbutton').nth(3).click();
  await page.getByRole('spinbutton').nth(3).fill('2');
  await page.getByRole('button').nth(5).click();
  await page.getByRole('button').first().click();
  // start rolling for 6 * 6 * 2, which should be the number of dice values that are created
  await page.getByRole('button', { name: 'Start' }).click();
  const die1 = page.locator('div[class*="die__value"]').first();
  const die2 = page.locator('div[class*="die__value"]').nth(1);
  const actualRolls: number[] = [];
  for(let index = 0; index < 6 * 6 * 2; index++) {
    const die1value = await die1.textContent();
    const die2value = await die2.textContent();
    expect(die1value).not.toBeNull();
    expect(die2value).not.toBeNull();
    actualRolls.push(parseInt(die1value ?? '0') * parseInt(die2value ?? '0'));
    await page.getByRole('button', { name: 'Roll' }).click();
  }
  actualRolls.sort((first, second) => first - second);
  const expectedRolls: number[] = [];
  for(let die1index = 1; die1index < 7; die1index++) {
    for(let die2index = 1; die2index < 7; die2index++) {
      expectedRolls.push(die1index * die2index);
      expectedRolls.push(die1index * die2index);
    }
  }
  expectedRolls.sort((first, second) => first - second);
  expect(actualRolls).toEqual(expectedRolls);
});
