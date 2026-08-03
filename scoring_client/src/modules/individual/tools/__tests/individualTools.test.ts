import { describe, it, expect } from 'vitest';
import { calcIndividualScore, expandIndividualScores, createIndividualPlayer } from '../individualTools.ts';
import type { IndividualPlayerModel } from '../../models/IndividualPlayerModel.ts';
import type { IndividualState } from '../../store/IndividualStore.ts';

function createPlayer(scores: number[]): IndividualPlayerModel {
  return { first: false, name: '', scores };
}

function createState(round: number): IndividualState {
  return {
    active: false,
    configuration: {
      scoreInterval: 1,
      useScoreInterval: false,
      trackDealer: false,
      minPlayerCount: 1,
      useMaxScore: false,
      maxPlayerCount: 2,
      maxScore: 1,
      name: 'test',
    },
    finished: false,
    gameSessionId: "",
    players: [],
    round: round,
    scoringRound: 0,
  };
}

describe('calcIndividualScore', () => {
  it('returns 0 when round is negative', () => {
    const player = createPlayer([10, 20, 30]);
    expect(calcIndividualScore(player, -1)).toBe(0);
    expect(calcIndividualScore(player, -5)).toBe(0);
  });

  it('returns the score for round 0', () => {
    const player = createPlayer([10, 20, 30]);
    expect(calcIndividualScore(player, 0)).toBe(10);
  });

  it('sums scores up to a given round', () => {
    const player = createPlayer([5, 10, 15]);
    expect(calcIndividualScore(player, 0)).toBe(5);
    expect(calcIndividualScore(player, 1)).toBe(15);
    expect(calcIndividualScore(player, 2)).toBe(30);
  });

  it('handles a player with no scores', () => {
    const player = createPlayer([]);
    expect(calcIndividualScore(player, 0)).toBe(0);
    expect(calcIndividualScore(player, 5)).toBe(0);
  });

  it('treats out-of-bounds rounds as having score 0 beyond available data', () => {
    const player = createPlayer([10, 20]);
    // Rounds 0 and 1 sum to 30; round 2 accesses index 2 which doesn't exist → treated as 0
    expect(calcIndividualScore(player, 2)).toBe(30);
    expect(calcIndividualScore(player, 5)).toBe(30);
  });

  it('handles scores with null/undefined values', () => {
    const player = createPlayer([10, undefined as unknown as number, 30]);
    expect(calcIndividualScore(player, 0)).toBe(10);
    // index 1 is undefined → treated as 0 via ?? operator
    expect(calcIndividualScore(player, 1)).toBe(10);
    expect(calcIndividualScore(player, 2)).toBe(40);
  });

  it('handles a player with a single score', () => {
    const player = createPlayer([42]);
    expect(calcIndividualScore(player, 0)).toBe(42);
    expect(calcIndividualScore(player, 1)).toBe(42);
  });

  it('returns the same result for the same input (deterministic)', () => {
    const player = createPlayer([3, 7, 11]);
    expect(calcIndividualScore(player, 1)).toBe(calcIndividualScore(player, 1));
  });
});

describe('expandIndividualScores', () => {
  it('returns the same array when index is less than array length', () => {
    const scores = [1, 2, 3];
    const result = expandIndividualScores(scores, 1);
    expect(result).toBe(scores); // Should be the same reference
    expect(result).toEqual([1, 2, 3]);
  });

  it('expands array to accommodate index when needed', () => {
    const scores = [1, 2];
    const result = expandIndividualScores(scores, 4);
    expect(result).toBe(scores); // Should be the same reference
    expect(result).toEqual([1, 2, 0, 0, 0]);
  });

  it('handles expanding to index 0 (no expansion needed)', () => {
    const scores = [1, 2, 3];
    const result = expandIndividualScores(scores, 0);
    expect(result).toBe(scores); // Should be the same reference
    expect(result).toEqual([1, 2, 3]);
  });

  it('handles empty array and expanding to index', () => {
    const scores: number[] = [];
    const result = expandIndividualScores(scores, 2);
    expect(result).toBe(scores); // Should be the same reference
    expect(result).toEqual([0, 0, 0]);
  });

  it('expands by exactly one element when needed', () => {
    const scores = [1, 2];
    const result = expandIndividualScores(scores, 2);
    expect(result).toBe(scores); // Should be the same reference
    expect(result).toEqual([1, 2, 0]);
  });
});

describe('createIndividualPlayer', () => {
  it('creates a player with correct name and scores array', () => {
    const state: IndividualState = createState(3);
    const player = createIndividualPlayer(state, 'Test Player', 50);
    
    expect(player.name).toBe('Test Player');
    expect(player.first).toBe(false);
    expect(player.scores).toEqual([0, 0, 50, 0]); // Should have 3 elements with last one set to startScore
  });

  it('creates a player with default startScore of 0', () => {
    const state: IndividualState = createState(2);
    const player = createIndividualPlayer(state, 'Test Player');
    
    expect(player.name).toBe('Test Player');
    expect(player.first).toBe(false);
    expect(player.scores).toEqual([0, 0, 0]);
  });

  it('handles round 0 correctly', () => {
    const state: IndividualState = createState(0);
    const player = createIndividualPlayer(state, 'Test Player', 100);
    
    expect(player.name).toBe('Test Player');
    expect(player.first).toBe(false);
    expect(player.scores).toEqual([100]);
  });

  it('handles round 1 correctly', () => {
    const state: IndividualState = createState(1);
    const player = createIndividualPlayer(state, 'Test Player', 200);
    
    expect(player.name).toBe('Test Player');
    expect(player.first).toBe(false);
    expect(player.scores).toEqual([200, 0]);
  });

  it('creates a player with correct scores for higher rounds', () => {
    const state: IndividualState = createState(5);
    const player = createIndividualPlayer(state, 'Test Player', 75);
    
    expect(player.name).toBe('Test Player');
    expect(player.first).toBe(false);
    expect(player.scores).toEqual([0, 0, 0, 0, 75, 0]);
  });

  it('uses startScore at the correct index based on round', () => {
    const state: IndividualState = createState(4);
    const player = createIndividualPlayer(state, 'Test Player', 150);
    
    expect(player.name).toBe('Test Player');
    expect(player.first).toBe(false);
    expect(player.scores).toEqual([0, 0, 0, 150, 0]);
  });
});
