import { describe, it, expect } from 'vitest';
import {
  getPlayerName,
  getPlayerNames,
  getCurrentDealer,
  getPlayersWithDealerLast
} from '../playerTools.ts';

describe('getPlayerName', () => {
  it('should return the player name if it exists', () => {
    const player = { name: 'John', first: false };
    const result = getPlayerName(player, 0);
    expect(result).toBe('John');
  });

  it('should return "player X" if name is empty/undefined', () => {
    const player = { name: '', first: false };
    const result = getPlayerName(player, 2);
    expect(result).toBe('player 3');
  });

  it('should handle index as array correctly', () => {
    const players = [
      { name: 'John', first: false },
      { name: 'Jane', first: false },
      { name: 'Bob', first: false }
    ];
    const result = getPlayerName(players[1], players);
    expect(result).toBe('Jane');
  });

  it('should return "player X" with correct index when name is empty and using array as index', () => {
    const players = [
      { name: 'John', first: false },
      { name: '', first: false },
      { name: 'Bob', first: false }
    ];
    const result = getPlayerName(players[1], players);
    expect(result).toBe('player 2');
  });
});

describe('getPlayerNames', () => {
  it('should return combined player names separated by ", "', () => {
    const players = [
      { name: 'John', first: false },
      { name: 'Jane', first: false },
      { name: 'Bob', first: false }
    ];
    const result = getPlayerNames(players);
    expect(result).toBe('John, Jane, Bob');
  });

  it('should handle empty names correctly', () => {
    const players = [
      { name: 'John', first: false },
      { name: '', first: false },
      { name: 'Bob', first: false }
    ];
    const result = getPlayerNames(players);
    expect(result).toBe('John, player 2, Bob');
  });

  it('should handle all empty names correctly', () => {
    const players = [
      { name: '', first: false },
      { name: '', first: false },
      { name: '', first: false }
    ];
    const result = getPlayerNames(players);
    expect(result).toBe('player 1, player 2, player 3');
  });

  it('should handle empty array', () => {
    const players: any[] = [];
    const result = getPlayerNames(players);
    expect(result).toBe('');
  });
});

describe('getCurrentDealer', () => {
  it('should return the index of the first dealer when round is 0', () => {
    const players = [
      { name: 'John', first: false },
      { name: 'Jane', first: true },
      { name: 'Bob', first: false }
    ];
    const result = getCurrentDealer(players, 0);
    expect(result).toBe(1);
  });

  it('should return the correct dealer index for round 1', () => {
    const players = [
      { name: 'John', first: false },
      { name: 'Jane', first: true },
      { name: 'Bob', first: false }
    ];
    const result = getCurrentDealer(players, 1);
    expect(result).toBe(2);
  });

  it('should handle circular rotation correctly', () => {
    const players = [
      { name: 'John', first: false },
      { name: 'Jane', first: true },
      { name: 'Bob', first: false }
    ];
    const result = getCurrentDealer(players, 3);
    expect(result).toBe(1);
  });

  it('should handle single player correctly', () => {
    const players = [
      { name: 'John', first: true }
    ];
    const result = getCurrentDealer(players, 5);
    expect(result).toBe(0);
  });
});

describe('getPlayersWithDealerLast', () => {
  it('should return players with dealer as last player for round 0', () => {
    const players = [
      { name: 'John', first: false },
      { name: 'Jane', first: true },
      { name: 'Bob', first: false }
    ];
    const result = getPlayersWithDealerLast(players, 0);
    expect(result[0]).toBe(players[2]); // John should be first
    expect(result[1]).toBe(players[0]); // Bob should be second
    expect(result[2]).toBe(players[1]); // Jane should be last
  });

  it('should return players with dealer as last player for round 1', () => {
    const players = [
      { name: 'John', first: false },
      { name: 'Jane', first: true },
      { name: 'Bob', first: false }
    ];
    const result = getPlayersWithDealerLast(players, 1);
    expect(result[0]).toBe(players[0]); // John should be first
    expect(result[1]).toBe(players[1]); // Jane should be second
    expect(result[2]).toBe(players[2]); // Bob should be last
  });

  it('should handle circular rotation correctly', () => {
    const players = [
      { name: 'John', first: false },
      { name: 'Jane', first: true },
      { name: 'Bob', first: false }
    ];
    const result = getPlayersWithDealerLast(players, 3);
    expect(result[2]).toBe(players[1]); // Jane should be last (circular)
  });

  it('should maintain the correct order for all players except dealer', () => {
    const players = [
      { name: 'John', first: false },
      { name: 'Jane', first: true },
      { name: 'Bob', first: false },
      { name: 'Alice', first: false }
    ];
    const result = getPlayersWithDealerLast(players, 0);
    expect(result[0]).toBe(players[2]); // Jane (dealer) should be first in the new order
    expect(result[1]).toBe(players[3]); // Bob
    expect(result[2]).toBe(players[0]); // Alice
    expect(result[3]).toBe(players[1]); // John (dealer is last)
  });
});