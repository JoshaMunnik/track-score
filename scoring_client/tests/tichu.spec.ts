import {test, expect} from '@playwright/test';
import {setupLocalStorage} from "./setupLocalStorage";

type Team = {
  callGrand?: boolean;
  callTichu0?: boolean;
  callTichu1?: boolean;
  first?: boolean;
  winGrand?: boolean;
  winTichu?: boolean;
  cardScore?: number;
}

type Round = {
  team0: Team;
  team1: Team;
};

type Game = Round[];

const TichuGame: Game = [
  {
    team0: {
      cardScore: 65
    },
    team1: {}
  },
  // 65, 35
  {
    team0: {
      callTichu0: true,
      winTichu: true,
      cardScore: 20
    },
    team1: {}
  },
  // 185, 115
  {
    team0: {
      callGrand: true,
      winGrand: true,
      cardScore: 30
    },
    team1: {}
  },
  // 415, 185
  {
    team0: {},
    team1: {
      first: true,
    }
  },
  // 415, 385
  {
    team0: {
      callTichu0: true,
      cardScore: 15
    },
    team1: {}
  },
  // 330, 470
  {
    team0: {
      cardScore: 75
    },
    team1: {
      callGrand: true,
    }
  },
  // 405, 295
  {
    team0: {
      callTichu0: true,
      callTichu1: true,
      winTichu: true,
      cardScore: 5
    },
    team1: {}
  },
  // 410, 390
  {
    team0: {
      callTichu0: true,
      cardScore: 10
    },
    team1: {
      callTichu0: true,
      winTichu: true,
    }
  },
  // 320, 580
  {
    team0: {
      cardScore: 70
    },
    team1: {}
  },
  // 390, 610
  {
    team0: {
      callTichu0: true,
      winTichu: true,
      first: true,
    },
    team1: {}
  },
  // 690, 610
  {
    team0: {
      callTichu0: true,
    },
    team1: {
      first: true,
    }
  },
  // 590, 810
  {
    team0: {
      cardScore: 45,
    },
    team1: {
      callGrand: true,
    }
  },
  // 635, 665
  {
    team0: {},
    team1: {
      first: true,
    }
  },
  // 635, 865
  {
    team0: {
      cardScore: 85,
    },
    team1: {}
  },
  // 720, 880
  {
    team0: {
      cardScore: -15,
    },
    team1: {}
  },
  // 705, 995
  {
    team0: {
      cardScore: 25,
    },
    team1: {}
  },
  // 730, 1070
];

function calcTeamScore(team: Team, cardScore: number): number {
  let result = cardScore;
  if (team.first) {
    result += 200;
  }
  if (team.callGrand) {
    result += team.winGrand ? 200 : -200;
  }
  if (team.callTichu0) {
    if (team.callTichu1) {
      result += team.winTichu ? 0 : -200;
    } else {
      result += team.winTichu ? 100 : -100;
    }
  }
  return result;
}

function calcRoundScore(round: Round): [number, number] {
  const ignoreScore = round.team0.first || round.team1.first;
  return [
    calcTeamScore(round.team0, ignoreScore ? 0 : (round.team0.cardScore || 0)),
    calcTeamScore(round.team1, ignoreScore ? 0 : 100 - (round.team0.cardScore || 0)),
  ];
}

test.beforeEach(async ({page}) => {
  // Setup local storage before each test
  await setupLocalStorage(page);
  // starting page
  await page.goto('/client/tichu');
});

test('full tichu game', async ({page}) => {
  // add 4 players
  await page.getByRole('link', {name: 'Add players'}).click();
  await page.getByRole('button', {name: 'Add'}).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Player 1');
  await page.getByRole('textbox').press('Enter');
  await page.getByRole('textbox').nth(1).fill('Player 2');
  await page.getByRole('textbox').nth(1).press('Enter');
  await page.getByRole('textbox').nth(2).fill('Player 3');
  await page.getByRole('textbox').nth(2).press('Enter');
  await page.getByRole('textbox').nth(3).fill('Player 4');
  await page.getByRole('button', {name: 'Start'}).click();
  const totalScores = [0, 0];
  for (let index = 0; index < TichuGame.length; index++) {
    const round = TichuGame[index];
    const scoreRow = 3 + index * 5;
    // check if containers have the GTT buttons (both columns use span of 2)
    const container0 = page.locator('div[class*="grid-item"]').nth(scoreRow + 1);
    const container1 = page.locator('div[class*="grid-item"]').nth(scoreRow + 2);
    await expect(container0).toHaveText('GTT');
    await expect(container1).toHaveText('GTT');
    // set GTT buttons
    const team0Grand = container0.getByText('G').first();
    const team0Tichu0 = container0.getByText('T').first();
    const team0Tichu1 = container0.getByText('T').nth(1);
    const team1Grand = container1.getByText('G').first();
    const team1Tichu0 = container1.getByText('T').first();
    const team1Tichu1 = container1.getByText('T').nth(1);
    if (round.team0.callGrand) {
      await expect(team0Grand).toBeVisible();
      await team0Grand.click();
    }
    if (round.team0.callTichu0) {
      await expect(team0Tichu0).toBeVisible();
      await team0Tichu0.click();
    }
    if (round.team0.callTichu1) {
      await expect(team0Tichu1).toBeVisible();
      await team0Tichu1.click();
    }
    if (round.team1.callGrand) {
      await expect(team1Grand).toBeVisible();
      await team1Grand.click();
    }
    if (round.team1.callTichu0) {
      await expect(team1Tichu0).toBeVisible();
      await team1Tichu0.click();
    }
    if (round.team1.callTichu1) {
      await expect(team1Tichu1).toBeVisible();
      await team1Tichu1.click();
    }
    // enter scores
    const roundScores = calcRoundScore(round);
    await page.getByRole('link', {name: 'Scoring'}).click();
    // size of row with input or output
    const firstTeam0Size = 3;
    const cardScoreTeam0Size = (round.team0.first || round.team1.first) ? 0 : 3;
    const grandTeam0Size = round.team0.callGrand ? 3 : 0;
    const tichu0Team0Size = round.team0.callTichu0 ? 3 : 0;
    const tichu1Team0Size = round.team0.callTichu1 ? 3 : 0;
    const totalTeam0Size = 3;
    const firstTeam1Size = 3;
    const cardScoreTeam1Size = cardScoreTeam0Size;
    const grandTeam1Size = round.team1.callGrand ? 3 : 0;
    const tichu0Team1Size = round.team1.callTichu0 ? 3 : 0;
    const tichu1Team1Size = round.team1.callTichu1 ? 3 : 0;
    // get index to the first column (first = description, second = input, third = score)
    const input = 1;
    const score = 2;
    const firstTeam0 = 1;
    const cardScoreTeam0 = firstTeam0 + firstTeam0Size;
    const grandTeam0 = cardScoreTeam0 + cardScoreTeam0Size;
    const tichu0Team0 = grandTeam0 + grandTeam0Size;
    const tichu1Team0 = tichu0Team0 + tichu0Team0Size;
    const totalTeam0 = tichu1Team0 + tichu1Team0Size;
    // + 1 to skip player names row
    const firstTeam1 = totalTeam0 + 1 + totalTeam0Size;
    const cardScoreTeam1 = firstTeam1 + firstTeam1Size;
    const grandTeam1 = cardScoreTeam1 + cardScoreTeam1Size;
    const tichu0Team1 = grandTeam1 + grandTeam1Size;
    const tichu1Team1 = tichu0Team1 + tichu0Team1Size;
    const totalTeam1 = tichu1Team1 + tichu1Team1Size;
    await expect(
      page.locator('div[class*="grid-item"]').nth(firstTeam0 + input).locator('span')
    ).toBeVisible();
    // set inputs
    if (round.team0.first) {
      await page
        .locator('div[class*="grid-item"]')
        .nth(firstTeam0 + input)
        .locator('label')
        .click();
    }
    if (cardScoreTeam0Size > 0) {
      const numberInput = page
        .locator('div[class*="grid-item"]')
        .nth(cardScoreTeam0 + input)
        .getByRole('spinbutton')
        .first();
      await numberInput.click();
      await numberInput.fill(round.team0.cardScore!.toString());
    }
    if (round.team0.winGrand) {
      await page
        .locator('div[class*="grid-item"]')
        .nth(grandTeam0 + input)
        .locator('label')
        .click();
    }
    if (round.team0.winTichu) {
      await page
        .locator('div[class*="grid-item"]')
        .nth(tichu0Team0 + input)
        .locator('label')
        .click();
    }
    if (round.team1.first) {
      // +3 since, card scores are still visible at this point
      await page
        .locator('div[class*="grid-item"]')
        .nth(firstTeam1 + input + 3)
        .locator('label')
        .click();
    }
    if (round.team1.winGrand) {
      await page
        .locator('div[class*="grid-item"]')
        .nth(grandTeam1 + input)
        .locator('label')
        .click();
    }
    if (round.team1.winTichu) {
      await page
        .locator('div[class*="grid-item"]')
        .nth(tichu0Team1 + input)
        .locator('label')
        .click();
    }
    // validate scores in the 3rd column
    await expect(page.locator('div[class*="grid-item"]').nth(firstTeam0 + score))
      .toHaveText(round.team0.first ? '200' : '0');
    if (cardScoreTeam0Size > 0) {
      await expect(page.locator('div[class*="grid-item"]').nth(cardScoreTeam0 + score))
        .toHaveText(round.team0.cardScore!.toString());
    }
    if (grandTeam0Size > 0) {
      await expect(page.locator('div[class*="grid-item"]').nth(grandTeam0 + score))
        .toHaveText(round.team0.winGrand ? '200' : '-200');
    }
    if (tichu0Team0Size > 0) {
      await expect(page.locator('div[class*="grid-item"]').nth(tichu0Team0 + score))
        .toHaveText(round.team0.winTichu ? '100' : '-100');
    }
    if (tichu1Team0Size > 0) {
      await expect(page.locator('div[class*="grid-item"]').nth(tichu1Team0 + score))
        .toHaveText('-100');
    }
    await expect(page.locator('div[class*="grid-item"]').nth(firstTeam1 + score))
      .toHaveText(round.team1.first ? '200' : '0');
    if (cardScoreTeam1Size > 0) {
      await expect(page.locator('div[class*="grid-item"]').nth(cardScoreTeam1 + score))
        .toHaveText((100 - round.team0.cardScore!).toString());
    }
    if (grandTeam1Size > 0) {
      await expect(page.locator('div[class*="grid-item"]').nth(grandTeam1 + score))
        .toHaveText(round.team1.winGrand ? '200' : '-200');
    }
    if (tichu0Team1Size > 0) {
      await expect(page.locator('div[class*="grid-item"]').nth(tichu0Team1 + score))
        .toHaveText(round.team1.winTichu ? '100' : '-100');
    }
    if (tichu1Team1Size > 0) {
      await expect(page.locator('div[class*="grid-item"]').nth(tichu1Team1 + score))
        .toHaveText('-100');
    }
    // validate total score per team
    const totalTeam0Score = page.locator('div[class*="grid-item"]').nth(totalTeam0 + score);
    const totalTeam1Score = page.locator('div[class*="grid-item"]').nth(totalTeam1 + score);
    await expect(totalTeam0Score).toHaveText(roundScores[0].toString());
    await expect(totalTeam1Score).toHaveText(roundScores[1].toString());
    // play next round
    await page.getByRole('button', {name: 'Next round'}).click();
    // update total scores
    totalScores[0] += roundScores[0];
    totalScores[1] += roundScores[1];
    // validate score and total score fields
    const score0 = page.locator('div[class*="grid-item"]').nth(scoreRow + 1);
    const score1 = page.locator('div[class*="grid-item"]').nth(scoreRow + 3);
    await expect(score0).toHaveText(roundScores[0].toString());
    await expect(score1).toHaveText(roundScores[1].toString());
    // 3 columns in the new score row, since the GTT container uses span of 2
    const newScoreRowSize = index < TichuGame.length - 1 ? 3 : 0;
    const total0 = page.locator('div[class*="grid-item"]').nth(scoreRow + 1 + 5 + newScoreRowSize);
    const total1 = page.locator('div[class*="grid-item"]').nth(scoreRow + 3 + 5 + newScoreRowSize);
    await expect(total0).toHaveText(totalScores[0].toString());
    await expect(total1).toHaveText(totalScores[1].toString());
  }
  await expect(page.getByRole('button', {name: 'Start', exact: true})).toHaveCount(0);
  await expect(page.locator('div[class*="grid-item"]').nth(1)).not.toHaveClass(/.*winner.*/);
  await expect(page.locator('div[class*="grid-item"]').nth(2)).toHaveClass(/.*winner.*/);
  // check correct style for each row
  for (let index = 0; index <= TichuGame.length; index++) {
    const entry0 = page.locator('div[class*="grid-item"]').nth(index * 5 + 1 + 3);
    const entry1 = page.locator('div[class*="grid-item"]').nth(index * 5 + 2 + 3);
    const entry2 = page.locator('div[class*="grid-item"]').nth(index * 5 + 3 + 3) ;
    const entry3 = page.locator('div[class*="grid-item"]').nth(index * 5 + 4 + 3);
    await expect(entry0).not.toHaveClass(/.*winner.*/);
    await expect(entry1).not.toHaveClass(/.*winner.*/);
    await expect(entry2).toHaveClass(/.*winner.*/);
    await expect(entry3).toHaveClass(/.*winner.*/);
  }
});
