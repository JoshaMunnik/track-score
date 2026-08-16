import { describe, expect, it } from 'vitest';
import { calcWizardScore } from '../wizardTools.ts';
import type { WizardPlayerModel } from '../../models/WizardPlayerModel.ts';

describe('calcWizardScore', () => {
  function createPlayer(
    rounds: WizardPlayerModel['rounds'],
    startRound = 0,
    startScore = 0,
  ): WizardPlayerModel {
    return {
      name: 'Test Player',
      first: false,
      rounds,
      startRound,
      startScore,
    };
  }

  it('returns start score when calculating from the start round and no previous score exists', () => {
    const player = createPlayer([
      { bid: 0, taken: 0 },
    ]);

    expect(calcWizardScore(player, 0)).toBe(20);
  });

  it('adds 20 plus 10 per taken trick when bid matches taken', () => {
    const player = createPlayer([
      { bid: 0, taken: 0 },
      { bid: 2, taken: 2 },
      { bid: 3, taken: 3 },
    ]);

    expect(calcWizardScore(player, 2)).toBe(20 + 40 + 50);
  });

  it('subtracts 10 per trick difference when bid does not match taken', () => {
    const player = createPlayer([
      { bid: 1, taken: 0 },
      { bid: 1, taken: 3 },
      { bid: 4, taken: 1 },
    ]);

    expect(calcWizardScore(player, 2)).toBe(-10 - 20 - 30);
  });

  it('calculates score up to and including the requested round only', () => {
    const player = createPlayer([
      { bid: 0, taken: 0 },
      { bid: 1, taken: 1 },
      { bid: 5, taken: 0 },
    ]);

    expect(calcWizardScore(player, 1)).toBe(20 + 30);
  });

  it('uses the player start score when the requested round is at or after the start round', () => {
    const player = createPlayer([
      { bid: 0, taken: 0 },
      { bid: 2, taken: 2 },
      { bid: 1, taken: 3 },
    ], 1, 100);

    expect(calcWizardScore(player, 2)).toBe(100 + 40 - 20);
  });

  it('ignores rounds before the player start round', () => {
    const player = createPlayer([
      { bid: 0, taken: 0 },
      { bid: 2, taken: 1 },
      { bid: 1, taken: 1 },
    ], 2, 50);

    expect(calcWizardScore(player, 2)).toBe(50 + 30);
  });

  it('returns 0 when the requested round is before the player start round', () => {
    const player = createPlayer([
      { bid: 0, taken: 0 },
      { bid: 1, taken: 1 },
    ], 1, 75);

    expect(calcWizardScore(player, 0)).toBe(0);
  });

  it('handles a mix of successful and failed bids', () => {
    const player = createPlayer([
      { bid: 0, taken: 0 },
      { bid: 1, taken: 1 },
      { bid: 2, taken: 0 },
      { bid: 3, taken: 3 },
      { bid: 1, taken: 4 },
    ]);

    expect(calcWizardScore(player, 4)).toBe(20 + 30 - 20 + 50 - 30);
  });
});