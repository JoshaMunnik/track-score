import {test, expect} from '@playwright/test';
import {setupLocalStorage} from "./setupLocalStorage";

type GameEntry = {
  score: number;
  bid: number;
  taken: number;
}

type GameRound = GameEntry[];

type Game = GameRound[];

const ThreePlayerGame: Game = [
  // round 1
  [
    {score: 30, bid: 1, taken: 1},
    {score: 20, bid: 0, taken: 0},
    {score: 20, bid: 0, taken: 0}
  ],
  // round 2
  [
    {score: 60, bid: 1, taken: 1},
    {score: 50, bid: 1, taken: 1},
    {score: 40, bid: 0, taken: 0}
  ],
  // round 3
  [
    {score: 90, bid: 1, taken: 1},
    {score: 80, bid: 1, taken: 1},
    {score: 70, bid: 1, taken: 1}
  ],
  // round 4
  [
    {score: 130, bid: 2, taken: 2},
    {score: 110, bid: 1, taken: 1},
    {score: 100, bid: 1, taken: 1}
  ],
  // round 5
  [
    {score: 170, bid: 2, taken: 2},
    {score: 100, bid: 1, taken: 2},
    {score: 130, bid: 1, taken: 1}
  ],
  // round 6
  [
    {score: 210, bid: 2, taken: 2},
    {score: 140, bid: 2, taken: 2},
    {score: 120, bid: 1, taken: 2}
  ],
  // round 7
  [
    {score: 200, bid: 4, taken: 3},
    {score: 180, bid: 2, taken: 2},
    {score: 160, bid: 2, taken: 2}
  ],
  // round 8
  [
    {score: 250, bid: 3, taken: 3},
    {score: 170, bid: 2, taken: 3},
    {score: 200, bid: 2, taken: 2}
  ],
  // round 9
  [
    {score: 300, bid: 3, taken: 3},
    {score: 220, bid: 3, taken: 3},
    {score: 190, bid: 2, taken: 3}
  ],
  // round 10
  [
    {score: 290, bid: 5, taken: 4},
    {score: 270, bid: 3, taken: 3},
    {score: 240, bid: 3, taken: 3}
  ],
  // round 11
  [
    {score: 350, bid: 4, taken: 4},
    {score: 260, bid: 3, taken: 4},
    {score: 290, bid: 3, taken: 3}
  ],
  // round 12
  [
    {score: 410, bid: 4, taken: 4},
    {score: 320, bid: 4, taken: 4},
    {score: 280, bid: 3, taken: 4}
  ],
  // round 13
  [
    {score: 400, bid: 6, taken: 5},
    {score: 380, bid: 4, taken: 4},
    {score: 340, bid: 4, taken: 4}
  ],
  // round 14
  [
    {score: 470, bid: 5, taken: 5},
    {score: 370, bid: 4, taken: 5},
    {score: 400, bid: 4, taken: 4}
  ],
  // round 15
  [
    {score: 540, bid: 5, taken: 5},
    {score: 440, bid: 5, taken: 5},
    {score: 390, bid: 6, taken: 5}
  ],
  // round 16
  [
    {score: 530, bid: 5, taken: 6},
    {score: 510, bid: 5, taken: 5},
    {score: 460, bid: 5, taken: 5}
  ],
  // round 17
  [
    {score: 610, bid: 6, taken: 6},
    {score: 500, bid: 5, taken: 6},
    {score: 530, bid: 5, taken: 5}
  ],
  // round 18
  [
    {score: 690, bid: 6, taken: 6},
    {score: 580, bid: 6, taken: 6},
    {score: 520, bid: 7, taken: 6}
  ],
  // round 19
  [
    {score: 680, bid: 6, taken: 7},
    {score: 660, bid: 6, taken: 6},
    {score: 600, bid: 6, taken: 6}
  ],
  // round 20
  [
    {score: 770, bid: 7, taken: 7},
    {score: 650, bid: 6, taken: 7},
    {score: 680, bid: 6, taken: 6}
  ],
];

test.beforeEach(async ({page}) => {
  // Setup local storage before each test
  await setupLocalStorage(page);
  await page.goto('/client/wizard');
});

test('start with 3 players', async ({page}) => {
  await expect(page.getByRole('link', {name: 'Enter players'})).toBeVisible();
  await page.getByRole('link').first().click();
  await expect(page.getByRole('button', {name: 'Start'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Start'})).toBeDisabled();
  await page.getByRole('button', {name: 'Add'}).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Player 1');
  await page.getByRole('textbox').press('Enter');
  await page.getByRole('textbox').nth(1).click();
  await expect(page.getByRole('textbox').nth(1)).toBeVisible();
  await expect(page.getByRole('button', {name: 'Start'})).toBeDisabled();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('Player 2');
  await page.getByRole('textbox').nth(1).press('Enter');
  await expect(page.getByRole('textbox').nth(2)).toBeVisible();
  await expect(page.getByRole('button', {name: 'Start'})).toBeDisabled();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('Player 3');
  await page.getByRole('textbox').nth(2).click();
  await expect(page.getByRole('button', {name: 'Start'})).toBeDisabled();
  await expect(page.getByRole('radio').first()).toBeVisible();
  await page.getByRole('radio').first().check();
  await expect(page.getByRole('button', {name: 'Start'})).toBeEnabled();
  await page.getByRole('button', {name: 'Start'}).click();
  await expect(page.getByRole('heading')).toContainText('Wizard - Round 1 of 20');
  await expect(page.getByText('Player 1dealer')).toBeVisible();
  await expect(page.locator('div').filter({hasText: /^Player 1dealer$/}).first()).toBeVisible();
  await expect(page.locator('div').filter({hasText: /^Player 2$/}).first()).toBeVisible();
  await expect(page.locator('div').filter({hasText: /^Player 3$/}).first()).toBeVisible();
  await expect(page.locator('div').filter({hasText: /^20$/}).first()).toBeVisible();
});

test('one round with 3 players', async ({page}) => {
  await page.getByRole('link', {name: 'Enter players'}).click();
  await page.getByRole('button', {name: 'Add'}).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Player 1');
  await page.getByRole('textbox').press('Enter');
  await page.getByRole('textbox').nth(1).fill('Player 2');
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByRole('textbox').nth(2).fill('Player 3');
  await page.getByRole('radio').first().check();
  await page.getByRole('button', {name: 'Start'}).click();
  // player that is the bidder is the last player
  const score0 = page.locator('div[class*="grid-item"]').nth(5).locator('p');
  const bid0 = page.locator('div[class*="grid-item"]').nth(6).locator('p');
  const score1 = page.locator('div[class*="grid-item"]').nth(7).locator('p');
  const bid1 = page.locator('div[class*="grid-item"]').nth(8).locator('p');
  const score2 = page.locator('div[class*="grid-item"]').nth(9).locator('p');
  const bid2 = page.locator('div[class*="grid-item"]').nth(10).locator('p');
  // before user entered bids
  await expect(score0).toHaveText('');
  await expect(bid0).toHaveText('?');
  await expect(score1).toHaveText('');
  await expect(bid1).toHaveText('?');
  await expect(score2).toHaveText('');
  await expect(bid2).toHaveText('?');
  // check the rest are all empty
  for(let round = 1; round < 20; round++) {
    for(let column = 0; column < 6; column++) {
      const element = page.locator('div[class*="grid-item"]').nth(round * 7 + column + 1 + 4).locator('p');
      await expect(element).toHaveText('');
    }
  }
  // enter bids
  await page.getByRole('link', {name: 'Enter bids'}).click();
  await page.getByRole('spinbutton').first().click();
  await page.getByRole('spinbutton').first().fill('1');
  await page.getByRole('spinbutton').nth(1).click();
  await page.getByRole('spinbutton').nth(1).fill('0');
  await page.getByRole('spinbutton').nth(2).click();
  await page.getByRole('spinbutton').nth(2).fill('0');
  await page.getByRole('button', {name: 'Play'}).click();
  // after entering bids
  await expect(page.locator('div[class*="grid-item"]')).toHaveCount(4 + 20 * 7, { timeout: 10000 });
  await expect(score0).toHaveText('');
  await expect(bid0).toHaveText('0');
  await expect(score1).toHaveText('');
  await expect(bid1).toHaveText('1');
  await expect(score2).toHaveText('');
  await expect(bid2).toHaveText('0');
  // enter scores
  await page.getByRole('link', {name: 'Enter scores'}).click();
  await page.getByRole('spinbutton').first().click();
  await page.getByRole('spinbutton').first().fill('1');
  await page.getByRole('spinbutton').nth(1).click();
  await page.getByRole('spinbutton').nth(1).fill('0');
  await page.getByRole('spinbutton').nth(2).click();
  await page.getByRole('spinbutton').nth(2).fill('0');
  await page.getByRole('button', {name: 'Next round'}).click();
  // after entering scores
  await expect(page.locator('div[class*="grid-item"]')).toHaveCount(4 + 20 * 7, { timeout: 10000 });
  await expect(score0).toHaveText('20');
  await expect(bid0).toHaveText('0');
  await expect(score1).toHaveText('30');
  await expect(bid1).toHaveText('1');
  await expect(score2).toHaveText('20');
  await expect(bid2).toHaveText('0');
  // check next row
  const scoreNext0 = page.locator('div[class*="grid-item"]').nth(12).locator('p');
  const bidNext0 = page.locator('div[class*="grid-item"]').nth(13).locator('p');
  const scoreNext1 = page.locator('div[class*="grid-item"]').nth(14).locator('p');
  const bidNext1 = page.locator('div[class*="grid-item"]').nth(15).locator('p');
  const scoreNext2 = page.locator('div[class*="grid-item"]').nth(16).locator('p');
  const bidNext2 = page.locator('div[class*="grid-item"]').nth(17).locator('p');
  await expect(scoreNext0).toHaveText('');
  await expect(bidNext0).toHaveText('?');
  await expect(scoreNext1).toHaveText('');
  await expect(bidNext1).toHaveText('?');
  await expect(scoreNext2).toHaveText('');
  await expect(bidNext2).toHaveText('?');
  // names should now include a rank, also check that the next player has become the dealer
  await expect(page.locator('div').filter({hasText: /^2ndPlayer 1$/}).first()).toBeVisible();
  await expect(page.locator('div').filter({hasText: /^1stPlayer 2dealer$/}).first()).toBeVisible();
  await expect(page.locator('div').filter({hasText: /^2ndPlayer 3$/}).first()).toBeVisible();
  // check the rest are all empty
  for(let round = 2; round < 20; round++) {
    for(let column = 0; column < 6; column++) {
      const element = page.locator('div[class*="grid-item"]').nth(round * 7 + column + 1 + 4).locator('p');
      await expect(element).toHaveText('');
    }
  }
});

test('full game with 3 players', async ({page}) => {
  await page.getByRole('link', {name: 'Enter players'}).click();
  await page.getByRole('button', {name: 'Add'}).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Player 1');
  await page.getByRole('textbox').press('Enter');
  await page.getByRole('textbox').nth(1).fill('Player 2');
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByRole('textbox').nth(2).fill('Player 3');
  await page.getByRole('radio').first().check();
  await page.getByRole('button', {name: 'Start'}).click();
  for (let index = 0; index < ThreePlayerGame.length; index++) {
    const round = ThreePlayerGame[index];
    // in each round, the dealer is the last player; in the first round the first player is the
    // dealer; so the 2nd player is the first player.
    const player0 = (1 + index) % 3;
    const player1 = (player0 + 1) % 3;
    const player2 = (player1 + 1) % 3;
    await page.getByRole('link', {name: 'Enter bids'}).click();
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().fill(round[player0].bid.toString());
    await page.getByRole('spinbutton').nth(1).click();
    await page.getByRole('spinbutton').nth(1).fill(round[player1].bid.toString());
    await page.getByRole('spinbutton').nth(2).click();
    await page.getByRole('spinbutton').nth(2).fill(round[player2].bid.toString());
    await page.getByRole('button', {name: 'Play'}).click();
    await page.getByRole('link', {name: 'Enter scores'}).click();
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().fill(round[player0].taken.toString());
    await page.getByRole('spinbutton').nth(1).click();
    await page.getByRole('spinbutton').nth(1).fill(round[player1].taken.toString());
    await page.getByRole('spinbutton').nth(2).click();
    await page.getByRole('spinbutton').nth(2).fill(round[player2].taken.toString());
    const lastRound = index == ThreePlayerGame.length - 1;
    await page.getByRole('button', {name: lastRound ? 'Finish' : 'Next round'}).click();
    // there are 7 divs per round row (round + 3 x score + bid)
    // the first row contains 4 divs (round + 3x name)
    const score0 = page.locator('div[class*="grid-item"]').nth(4 + index * 7 + 1).locator('p');
    const score1 = page.locator('div[class*="grid-item"]').nth(4 + index * 7 + 3).locator('p');
    const score2 = page.locator('div[class*="grid-item"]').nth(4 + index * 7 + 5).locator('p');
    await expect(score0).toHaveText(round[0].score.toString());
    await expect(score1).toHaveText(round[1].score.toString());
    await expect(score2).toHaveText(round[2].score.toString());
  }
  const player0 = page.locator('div[class*="grid-item"]').nth(1);
  const player1 = page.locator('div[class*="grid-item"]').nth(2);
  const player2 = page.locator('div[class*="grid-item"]').nth(3);
  await expect(player0).toHaveClass(/.*alternate.*/);
  await expect(player1).not.toHaveClass(/.*alternate.*/);
  await expect(player2).not.toHaveClass(/.*alternate.*/);
});

test('starting a second game after a full game with the same 3 players', async ({page}) => {
  await page.getByRole('link', {name: 'Enter players'}).click();
  await page.getByRole('button', {name: 'Add'}).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Player 1');
  await page.getByRole('textbox').press('Enter');
  await page.getByRole('textbox').nth(1).fill('Player 2');
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByRole('textbox').nth(2).fill('Player 3');
  await page.getByRole('radio').first().check();
  await page.getByRole('button', {name: 'Start'}).click();
  // play games
  for (let index = 0; index < ThreePlayerGame.length; index++) {
    const round = ThreePlayerGame[index];
    // in each round, the dealer is the last player; in the first round the first player is the
    // dealer; so the 2nd player is the first player.
    const player0 = (1 + index) % 3;
    const player1 = (player0 + 1) % 3;
    const player2 = (player1 + 1) % 3;
    await page.getByRole('link', {name: 'Enter bids'}).click();
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().fill(round[player0].bid.toString());
    await page.getByRole('spinbutton').nth(1).click();
    await page.getByRole('spinbutton').nth(1).fill(round[player1].bid.toString());
    await page.getByRole('spinbutton').nth(2).click();
    await page.getByRole('spinbutton').nth(2).fill(round[player2].bid.toString());
    await page.getByRole('button', {name: 'Play'}).click();
    await page.getByRole('link', {name: 'Enter scores'}).click();
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().fill(round[player0].taken.toString());
    await page.getByRole('spinbutton').nth(1).click();
    await page.getByRole('spinbutton').nth(1).fill(round[player1].taken.toString());
    await page.getByRole('spinbutton').nth(2).click();
    await page.getByRole('spinbutton').nth(2).fill(round[player2].taken.toString());
    const lastRound = index == ThreePlayerGame.length - 1;
    await page.getByRole('button', {name: lastRound ? 'Finish' : 'Next round'}).click();
  }
  await page.getByRole('button', {name: 'New game with same players'}).click();
  // player that is the bidder is the last player
  const score0 = page.locator('div[class*="grid-item"]').nth(5).locator('p');
  const bid0 = page.locator('div[class*="grid-item"]').nth(6).locator('p');
  const score1 = page.locator('div[class*="grid-item"]').nth(7).locator('p');
  const bid1 = page.locator('div[class*="grid-item"]').nth(8).locator('p');
  const score2 = page.locator('div[class*="grid-item"]').nth(9).locator('p');
  const bid2 = page.locator('div[class*="grid-item"]').nth(10).locator('p');
  // before user entered bids
  await expect(score0).toHaveText('');
  await expect(bid0).toHaveText('?');
  await expect(score1).toHaveText('');
  await expect(bid1).toHaveText('?');
  await expect(score2).toHaveText('');
  await expect(bid2).toHaveText('?');
  // check the rest are all empty
  for(let round = 1; round < 20; round++) {
    for(let column = 0; column < 6; column++) {
      const element = page.locator('div[class*="grid-item"]').nth(round * 7 + column + 1 + 4).locator('p');
      await expect(element).toHaveText('');
    }
  }
});

test('starting a second game after a full game with different 3 players', async ({page}) => {
  await page.getByRole('link', {name: 'Enter players'}).click();
  await page.getByRole('button', {name: 'Add'}).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Player 1');
  await page.getByRole('textbox').press('Enter');
  await page.getByRole('textbox').nth(1).fill('Player 2');
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByRole('textbox').nth(2).fill('Player 3');
  await page.getByRole('radio').first().check();
  await page.getByRole('button', {name: 'Start'}).click();
  // play games
  for (let index = 0; index < ThreePlayerGame.length; index++) {
    const round = ThreePlayerGame[index];
    // in each round, the dealer is the last player; in the first round the first player is the
    // dealer; so the 2nd player is the first player.
    const player0 = (1 + index) % 3;
    const player1 = (player0 + 1) % 3;
    const player2 = (player1 + 1) % 3;
    await page.getByRole('link', {name: 'Enter bids'}).click();
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().fill(round[player0].bid.toString());
    await page.getByRole('spinbutton').nth(1).click();
    await page.getByRole('spinbutton').nth(1).fill(round[player1].bid.toString());
    await page.getByRole('spinbutton').nth(2).click();
    await page.getByRole('spinbutton').nth(2).fill(round[player2].bid.toString());
    await page.getByRole('button', {name: 'Play'}).click();
    await page.getByRole('link', {name: 'Enter scores'}).click();
    await page.getByRole('spinbutton').first().click();
    await page.getByRole('spinbutton').first().fill(round[player0].taken.toString());
    await page.getByRole('spinbutton').nth(1).click();
    await page.getByRole('spinbutton').nth(1).fill(round[player1].taken.toString());
    await page.getByRole('spinbutton').nth(2).click();
    await page.getByRole('spinbutton').nth(2).fill(round[player2].taken.toString());
    const lastRound = index == ThreePlayerGame.length - 1;
    await page.getByRole('button', {name: lastRound ? 'Finish' : 'Next round'}).click();
  }
  await page.getByRole('button', {name: 'New players'}).click();
  await page.getByRole('button', {name: 'Add'}).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Player 4');
  await page.getByRole('textbox').press('Enter');
  await page.getByRole('textbox').nth(1).fill('Player 5');
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByRole('textbox').nth(2).fill('Player 6');
  await page.getByRole('radio').first().check();
  await page.getByRole('button', {name: 'Start'}).click();
  await expect(page.locator('div').filter({hasText: /^Player 4dealer$/}).first()).toBeVisible();
  await expect(page.locator('div').filter({hasText: /^Player 5$/}).first()).toBeVisible();
  await expect(page.locator('div').filter({hasText: /^Player 6$/}).first()).toBeVisible();
  // player that is the bidder is the last player
  const score0 = page.locator('div[class*="grid-item"]').nth(5).locator('p');
  const bid0 = page.locator('div[class*="grid-item"]').nth(6).locator('p');
  const score1 = page.locator('div[class*="grid-item"]').nth(7).locator('p');
  const bid1 = page.locator('div[class*="grid-item"]').nth(8).locator('p');
  const score2 = page.locator('div[class*="grid-item"]').nth(9).locator('p');
  const bid2 = page.locator('div[class*="grid-item"]').nth(10).locator('p');
  // before user entered bids
  await expect(score0).toHaveText('');
  await expect(bid0).toHaveText('?');
  await expect(score1).toHaveText('');
  await expect(bid1).toHaveText('?');
  await expect(score2).toHaveText('');
  await expect(bid2).toHaveText('?');
  // check the rest are all empty
  for(let round = 1; round < 20; round++) {
    for(let column = 0; column < 6; column++) {
      const element = page.locator('div[class*="grid-item"]').nth(round * 7 + column + 1 + 4).locator('p');
      await expect(element).toHaveText('');
    }
  }
});
