import { describe, it, expect } from 'vitest';
import { AlignItem } from '../../types/enums/ui/AlignItem.ts';
import { DistributeContent } from '../../types/enums/ui/DistributeContent.ts';
import { alignToDistribute } from '../uiTools.ts';

describe('alignToDistribute', () => {
  it('returns Stretch when align is undefined', () => {
    expect(alignToDistribute(undefined)).toBe(DistributeContent.Stretch);
  });

  it.each([
    [AlignItem.Start, DistributeContent.Start],
    [AlignItem.Center, DistributeContent.Center],
    [AlignItem.End, DistributeContent.End],
    [AlignItem.Stretch, DistributeContent.Stretch],
  ])('maps %s to %s', (input, expected) => {
    expect(alignToDistribute(input)).toBe(expected);
  });

  // AlignItem.Base is a special case — it maps to Start, not Base (no Base in DistributeContent)
  it('maps AlignItem.Base to DistributeContent.Start', () => {
    expect(alignToDistribute(AlignItem.Base)).toBe(DistributeContent.Start);
  });

  it('returns consistent results for the same input (deterministic)', () => {
    const align = AlignItem.Center;
    expect(alignToDistribute(align)).toBe(alignToDistribute(align));
  });
});
