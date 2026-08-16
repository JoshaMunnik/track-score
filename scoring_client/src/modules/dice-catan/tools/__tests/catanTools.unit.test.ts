import { describe, expect, it } from 'vitest';
import { getCatanDieColor, isBarbarianShip } from '../catanTools.ts';
import { CatanDieColor } from '../../type/CatanDieColor.ts';

describe('getCatanDieColor', () => {
  it.each([
    [4, CatanDieColor.Blue],
    [5, CatanDieColor.Green],
    [6, CatanDieColor.Yellow],
  ])('returns the correct color for roll %d', (roll, expectedColor) => {
    expect(getCatanDieColor(roll)).toBe(expectedColor);
  });

  it.each([
    [1],
    [2],
    [3],
    [0],
    [-1],
    [7],
    [100],
  ])('returns black for non-color roll %d', (roll) => {
    expect(getCatanDieColor(roll)).toBe(CatanDieColor.Black);
  });
});

describe('isBarbarianShip', () => {
  it.each([
    [1],
    [2],
    [3],
    [0],
    [-1],
    [7],
    [100],
  ])('returns true when roll %d maps to black', (roll) => {
    expect(isBarbarianShip(roll)).toBe(true);
  });

  it.each([
    [4],
    [5],
    [6],
  ])('returns false when roll %d maps to a non-black color', (roll) => {
    expect(isBarbarianShip(roll)).toBe(false);
  });
});
