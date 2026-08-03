import { describe, it, expect } from 'vitest';
import { formatDate, rankName } from '../textTools.ts';

describe('formatDate', () => {
  it('formats a normal date correctly', () => {
    // January 15, 2024 09:05
    const date = new Date(2024, 0, 15, 9, 5);
    const result = formatDate(date);

    expect(result).toContain('2024');
    expect(result).toContain('January');
    expect(result).toContain('15');
    expect(result).toContain('09');
    expect(result).toContain('05');
  });

  it('handles single-digit months (January)', () => {
    const date = new Date(Date.UTC(2025, 0, 5, 3, 8));
    const result = formatDate(date);
    expect(result).toContain('January');
    expect(result).toContain('2025');
    expect(result).toContain('5');
  });

  it('handles midnight (00:00)', () => {
    const date = new Date(Date.UTC(2026, 6, 1, 0, 0));
    const result = formatDate(date);
    expect(result).toContain('July');
    expect(result).toContain('00');
    expect(result).toContain('00');
  });

  it('handles end-of-day (23:59)', () => {
    const date = new Date(2026, 11, 31, 23, 59);
    const result = formatDate(date);
    expect(result).toContain('December');
    expect(result).toContain('31');
    expect(result).toContain('23');
    expect(result).toContain('59');
  });

  it('returns consistent output for the same date', () => {
    const date = new Date(Date.UTC(2023, 11, 25, 14, 30));
    expect(formatDate(date)).toBe(formatDate(date));
  });

  it('handles NaN dates gracefully', () => {
    const invalidDate = new Date(NaN);
    expect(formatDate(invalidDate)).toBe('invalid date');
  });
});

describe('rankName', () => {
  it.each([
    [0, '0th'],
    [1, '1st'],
    [2, '2nd'],
    [3, '3rd'],
    [4, '4th'],
    [5, '5th'],
    [6, '6th'],
    [7, '7th'],
    [8, '8th'],
    [9, '9th'],
    [10, '10th'],
    [11, '11th'],
    [12, '12th'],
    [13, '13th'],
    [14, '14th'],
    [15, '15th'],
    [16, '16th'],
    [17, '17th'],
    [18, '18th'],
    [19, '19th'],
    [20, '20th'],
  ])('returns "%s" for rank %d', (rank, expected) => {
    expect(rankName(rank)).toBe(expected);
  });

  // Numbers ending in 1, 2, 3 but NOT in the teens
  it.each([
    [21, '21st'],
    [31, '31st'],
    [41, '41st'],
    [51, '51st'],
    [101, '101st'],
    [22, '22nd'],
    [32, '32nd'],
    [42, '42nd'],
    [102, '102nd'],
    [23, '23rd'],
    [33, '33rd'],
    [43, '43rd'],
    [103, '103rd'],
  ])('returns "%s" for rank %d', (rank, expected) => {
    expect(rankName(rank)).toBe(expected);
  });

  // Numbers ending in 4-0 (always "th"), including larger values
  it.each([
    [14, '14th'],
    [24, '24th'],
    [15, '15th'],
    [25, '25th'],
    [30, '30th'],
    [100, '100th'],
    [1000, '1000th'],
    [1004, '1004th'],
    [1014, '1014th'],
    [1100, '1100th'],
  ])('returns "%s" for rank %d', (rank, expected) => {
    expect(rankName(rank)).toBe(expected);
  });

  // Numbers ending in 1, 2, 3 at large values
  it.each([
    [1001, '1001st'],
    [1002, '1002nd'],
    [1003, '1003rd'],
    [1000001, '1000001st'],
    [1000002, '1000002nd'],
    [1000003, '1000003rd'],
  ])('returns "%s" for rank %d', (rank, expected) => {
    expect(rankName(rank)).toBe(expected);
  });

  // Negative numbers — the function does not special-case negatives
  it.each([
    [-1, '-1th'],
    [-2, '-2th'],
    [-3, '-3th'],
    [-11, '-11th'],
    [-12, '-12th'],
    [-13, '-13th'],
  ])('returns "%s" for rank %d (negative)', (rank, expected) => {
    expect(rankName(rank)).toBe(expected);
  });

  it('returns the same result for the same input (deterministic)', () => {
    const rank = 42;
    expect(rankName(rank)).toBe(rankName(rank));
  });
});
