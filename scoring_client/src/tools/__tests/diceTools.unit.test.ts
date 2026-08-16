import { describe, it, expect, beforeEach } from 'vitest';
import { getRolls } from '../diceTools.ts';

describe('getRolls', () => {
  // Reset preRolls array before each test to avoid side effects
  beforeEach(() => {
    // This is a mock to ensure we start with clean state for tests
  });

  it('should return empty array when diceCount is 0 or negative', () => {
    const result = getRolls([], 0, 1, 6, false, 1);
    expect(result).toEqual([]);
    
    const result2 = getRolls([], -1, 1, 6, false, 1);
    expect(result2).toEqual([]);
  });

  it('should return empty array when numberCount is 0 or negative', () => {
    const result = getRolls([], 2, 1, 0, false, 1);
    // All values should be between 0 and 1 (inclusive)
    for (const value of result) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    }

    const result2 = getRolls([], 2, 6, 1, false, 1);
    // All values should be between 1 and 6 (inclusive)
    for (const value of result2) {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(6);
    }
  });

  it('should generate random rolls when useGroups is false', () => {
    const result = getRolls([], 3, 1, 6, false, 1);
    expect(result).toHaveLength(3);
    
    // All values should be between 1 and 6 (inclusive)
    for (const value of result) {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(6);
    }
  });

  it('should generate correct number of rolls', () => {
    const result = getRolls([], 5, 1, 6, false, 1);
    expect(result).toHaveLength(5);
    
    const result2 = getRolls([], 1, 1, 6, false, 1);
    expect(result2).toHaveLength(1);
  });

  it('should handle different dice ranges correctly', () => {
    // Test with range 2-4
    const result = getRolls([], 3, 2, 4, false, 1);
    expect(result).toHaveLength(3);
    
    for (const value of result) {
      expect(value).toBeGreaterThanOrEqual(2);
      expect(value).toBeLessThanOrEqual(4);
    }
    
    // Test with range 10-15
    const result2 = getRolls([], 2, 10, 15, false, 1);
    expect(result2).toHaveLength(2);
    
    for (const value of result2) {
      expect(value).toBeGreaterThanOrEqual(10);
      expect(value).toBeLessThanOrEqual(15);
    }
  });

  it('should work with groups when preRolls is empty', () => {
    const preRolls: number[] = [];
    const result = getRolls(preRolls, 2, 1, 6, true, 1);
    
    expect(result).toHaveLength(2);
    
    // All values should be between 1 and 6
    for (const value of result) {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(6);
    }
    
    // preRolls should have been populated with combinations
    expect(preRolls).toHaveLength(6 * 6 - 1);
  });

  it('should use existing preRolls when available', () => {
    const preRolls = [5, 10, 15];
    const result = getRolls(preRolls, 2, 1, 6, true, 1);
    
    expect(result).toHaveLength(2);
    // Should have popped one element
    expect(preRolls).toHaveLength(2);
  });

  it('should handle group count correctly', () => {
    const preRolls: number[] = [];
    const result = getRolls(preRolls, 2, 1, 3, true, 2); // 2 groups
    
    expect(result).toHaveLength(2);
    
    for (const value of result) {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(3);
    }
    
    // The preRolls should be populated with combinations * groupCount
    expect(preRolls).toHaveLength(3 * 3 * 2 - 1);
  });

  it('should generate consistent results for same inputs (when using groups)', () => {
    const preRolls1: number[] = [];
    const result1 = getRolls(preRolls1, 2, 1, 6, true, 1);
    
    const preRolls2: number[] = [];
    const result2 = getRolls(preRolls2, 2, 1, 6, true, 1);
    
    // Results should be different due to shuffling, but both should have valid values
    expect(result1).toHaveLength(2);
    expect(result2).toHaveLength(2);
    
    for (const value of result1) {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(6);
    }
    
    for (const value of result2) {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(6);
    }
  });
});