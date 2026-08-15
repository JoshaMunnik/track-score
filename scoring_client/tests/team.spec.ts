import {test, expect} from '@playwright/test';
import {setupLocalStorage} from "./setupLocalStorage";

type Round = {
  scores: number[];
};

type Game = Round[];

const FourPlayerGame: Game = [
  {scores: [325, 150, 215, 185]},
  // + 540, 335
  {scores: [160, 315, 180, 235]},
  // + 340, 550
  // +            0880, 0885
  {scores: [-80, 105, 295, 260]},
  // + 205, 365
  // +            1085, 1250
  {scores: [315, 230, 140, 195]},
  // + 455, 425
  // +            1540, 1675
  {scores: [185, 340, 175, 115]},
  // + 360, 455
  // +            1900, 2130
];

test.beforeEach(async ({page}) => {
  // Setup local storage before each test
  await setupLocalStorage(page);
  // starting page
  await page.goto('/client/team');
});

test('full Pinnacolo game with 2 teams', async ({page}) => {
  // settings, choose Pinnacolo
  await page.getByRole('link').nth(1).click();
  await page.getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Pinnacolo' }).click();
  await page.getByRole('button').first().click();
  // add 4 players
  await page.getByRole('link', { name: 'Add players' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Player 1');
  await page.getByRole('textbox').press('Enter');
  await page.getByRole('textbox').nth(1).fill('Player 2');
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByRole('textbox').nth(2).fill('Player 3');
  await page.getByRole('textbox').nth(2).press('Enter');
  await page.getByRole('textbox').nth(3).fill('Player 4');
  await page.getByRole('radio').first().check();
  await page.getByRole('button', { name: 'Start' }).click();
  const totalScores = [0, 0];
  for(let index = 0; index < FourPlayerGame.length; index++) {
    const round = FourPlayerGame[index];
    const scoreRow = 3 + 5 + index * 5;
    const score0 = page.locator('div[class*="grid-item"]').nth(scoreRow + 1).locator('p');
    const score1 = page.locator('div[class*="grid-item"]').nth(scoreRow + 2).locator('p');
    const score2 = page.locator('div[class*="grid-item"]').nth(scoreRow + 3).locator('p');
    const score3 = page.locator('div[class*="grid-item"]').nth(scoreRow + 4).locator('p');
    await expect(score0).toHaveText('');
    await expect(score1).toHaveText('');
    await expect(score2).toHaveText('');
    await expect(score3).toHaveText('');
    // in each round, the dealer is the last player; in the first round the first player is the
    // dealer; so the 2nd player is the first player.
    const player0 = (1 + index) % 4;
    const player1 = (player0 + 1) % 4;
    const player2 = (player0 + 2) % 4;
    const player3 = (player0 + 3) % 4;
    await page.getByRole('button', {name: 'Scoring'}).click();
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().fill(round.scores[player0].toString());
    await page.getByRole('spinbutton').nth(1).click();
    await page.getByRole('spinbutton').nth(1).fill(round.scores[player1].toString());
    await page.getByRole('spinbutton').nth(2).click();
    await page.getByRole('spinbutton').nth(2).fill(round.scores[player2].toString());
    await page.getByRole('spinbutton').nth(3).click();
    await page.getByRole('spinbutton').nth(3).fill(round.scores[player3].toString());
    await page.getByRole('button', {name: 'Next round'}).click();
    totalScores[0] += round.scores[0] + round.scores[2];
    totalScores[1] += round.scores[1] + round.scores[3];
    // there are 4 divs per round row
    await expect(score0).toHaveText(round.scores[0].toString());
    await expect(score1).toHaveText(round.scores[2].toString());
    await expect(score2).toHaveText(round.scores[1].toString());
    await expect(score3).toHaveText(round.scores[3].toString());
    const totalRow = 3 + 5 + 5 + index * 5 + (index === FourPlayerGame.length - 1 ? 0 : 5);
    const total0 = page.locator('div[class*="grid-item"]').nth(totalRow + 1).locator('p');
    const total1 = page.locator('div[class*="grid-item"]').nth(totalRow + 2).locator('p');
    await expect(total0).toHaveText(totalScores[0].toString());
    await expect(total1).toHaveText(totalScores[1].toString());
  }
  await expect(page.getByRole('button', {name: 'Start', exact: true})).toHaveCount(0);
  const team0 = page.locator('div[class*="grid-item"]').nth(1);
  const team1 = page.locator('div[class*="grid-item"]').nth(2);
  await expect(team0).not.toHaveClass(/.*alternate.*/);
  await expect(team1).toHaveClass(/.*alternate.*/);
  for(let index = 0; index <= FourPlayerGame.length; index++) {
    const entry0 = page.locator('div[class*="grid-item"]').nth(index * 5 + 1 + 3);
    const entry1 = page.locator('div[class*="grid-item"]').nth(index * 5 + 2 + 3);
    const entry2 = page.locator('div[class*="grid-item"]').nth(index * 5 + 3 + 3);
    const entry3 = page.locator('div[class*="grid-item"]').nth(index * 5 + 4 + 3);
    await expect(entry0).not.toHaveClass(/.*alternate.*/);
    await expect(entry1).not.toHaveClass(/.*alternate.*/);
    await expect(entry2).toHaveClass(/.*alternate.*/);
    await expect(entry3).toHaveClass(/.*alternate.*/);
  }
  const totalRow = 3 + 5 + FourPlayerGame.length * 5 ;
  const total0 = page.locator('div[class*="grid-item"]').nth(totalRow + 1);
  const total1 = page.locator('div[class*="grid-item"]').nth(totalRow + 2);
  await expect(total0).not.toHaveClass(/.*alternate.*/);
  await expect(total1).toHaveClass(/.*alternate.*/);
});
