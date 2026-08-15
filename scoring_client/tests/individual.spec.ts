import {test, expect} from '@playwright/test';
import {setupLocalStorage} from "./setupLocalStorage";

type Round = {
  scores: number[];
};

type Game = Round[];

const ThreePlayerGame: Game = [
  {scores: [325, 150, 215]},
  {scores: [160, 315, 180]},
  // +      485, 465, 395
  {scores: [-80, 105, 295]},
  // +      405, 570, 680
  {scores: [315, 230, 140]},
  // +      720, 800, 820
  {scores: [185, 340, 175]},
  // +      905, 1140, 995
  {scores: [310, 145, 115]},
  // +     1215, 1285, 1110
  {scores: [85, 320, 250]},
  // +     1300, 1605, 1360
];

test.beforeEach(async ({page}) => {
  // Setup local storage before each test
  await setupLocalStorage(page);
  // starting page
  await page.goto('/client/individual');
});

test('full Pinnacolo game with 3 players', async ({page}) => {
  // settings, choose Pinnacolo
  await page.getByRole('link').nth(1).click();
  await page.getByRole('button').nth(1).click();
  await page.getByRole('button', {name: 'Pinnacolo'}).click();
  await page.getByRole('button').first().click();
  // add 3 players
  await page.getByRole('link', {name: 'Add players'}).click();
  await page.getByRole('button', {name: 'Add'}).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Player 1');
  await page.getByRole('textbox').press('Enter');
  await page.getByRole('textbox').nth(1).fill('Player 2');
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByRole('textbox').nth(2).fill('Player 3');
  await page.getByRole('radio').first().check();
  await page.getByRole('button', {name: 'Start'}).click();
  const totalScores = [0, 0, 0];
  for(let index = 0; index < ThreePlayerGame.length; index++) {
    const round = ThreePlayerGame[index];
    const scoreRow = 4 + index * 4;
    const score0 = page.locator('div[class*="grid-item"]').nth(scoreRow + 1).locator('p');
    const score1 = page.locator('div[class*="grid-item"]').nth(scoreRow + 2).locator('p');
    const score2 = page.locator('div[class*="grid-item"]').nth(scoreRow + 3).locator('p');
    await expect(score0).toHaveText('');
    await expect(score1).toHaveText('');
    await expect(score2).toHaveText('');
    // in each round, the dealer is the last player; in the first round the first player is the
    // dealer; so the 2nd player is the first player.
    const player0 = (1 + index) % 3;
    const player1 = (player0 + 1) % 3;
    const player2 = (player0 + 2) % 3;
    await page.getByRole('button', {name: 'Scoring'}).click();
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().fill(round.scores[player0].toString());
    await page.getByRole('spinbutton').nth(1).click();
    await page.getByRole('spinbutton').nth(1).fill(round.scores[player1].toString());
    await page.getByRole('spinbutton').nth(2).click();
    await page.getByRole('spinbutton').nth(2).fill(round.scores[player2].toString());
    await page.getByRole('button', {name: 'Next round'}).click();
    totalScores[0] += round.scores[0];
    totalScores[1] += round.scores[1];
    totalScores[2] += round.scores[2];
    // there are 4 divs per round row
    await expect(score0).toHaveText(round.scores[0].toString());
    await expect(score1).toHaveText(round.scores[1].toString());
    await expect(score2).toHaveText(round.scores[2].toString());
    const totalRow = 4 + 4 + index * 4 + (index === ThreePlayerGame.length - 1 ? 0 : 4);
    const total0 = page.locator('div[class*="grid-item"]').nth(totalRow + 1).locator('p');
    const total1 = page.locator('div[class*="grid-item"]').nth(totalRow + 2).locator('p');
    const total2 = page.locator('div[class*="grid-item"]').nth(totalRow + 3).locator('p');
    await expect(total0).toHaveText(totalScores[0].toString());
    await expect(total1).toHaveText(totalScores[1].toString());
    await expect(total2).toHaveText(totalScores[2].toString());
  }
  await expect(page.getByRole('button', {name: 'Start', exact: true})).toHaveCount(0);
  for(let index = 0; index <= ThreePlayerGame.length + 1; index++) {
    const entry0 = page.locator('div[class*="grid-item"]').nth(index * 4 + 1);
    const entry1 = page.locator('div[class*="grid-item"]').nth(index * 4 + 2);
    const entry2 = page.locator('div[class*="grid-item"]').nth(index * 4 + 3);
    await expect(entry0).not.toHaveClass(/.*winner.*/);
    await expect(entry1).toHaveClass(/.*winner.*/);
    await expect(entry2).not.toHaveClass(/.*winner.*/);
  }
});