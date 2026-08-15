import type {PlayerModel} from "../types/models/PlayerModel.ts";

/**
 * Gets the player name or if it is empty '(player #)'
 *
 * @param player
 *   Player to get name for
 * @param index
 *   Index of player in players list or players list to get index from
 *
 * @returns name of player
 */
export function getPlayerName<T extends PlayerModel>(player: T, index: number | T[]): string {
  if (typeof index !== 'number') {
    index = index.indexOf(player);
  }
  return player.name || `player ${index + 1}`;
}

/**
 * Gets all player names combined with a ', ' as separator.
 *
 * @param players
 *
 * @returns all player names combined
 */
export function getPlayerNames<T extends PlayerModel>(players: T[]): string {
  return players.map((player, index) => getPlayerName(player, index)).join(', ');
}

/**
 * Gets the index to the player that is current dealer.
 *
 * @param players
 *   Players
 * @param round
 *   Round (first round is 0)
 *
 * @returns index to dealer for that round
 */
export function getCurrentDealer<T extends PlayerModel>(players: T[], round: number): number {
  const playerCount: number = players.length;
  const firstDealer: number = players.findIndex(({first}) => first);
  return (firstDealer + round) % playerCount;
}

/**
 * Return a new reordered list of players, so that the player who is the dealer for a certain round
 * is the last player in the list.
 *
 * @param players
 *   Players to resort
 * @param round
 *   Current round
 *
 * @returns a reordered list of players
 */
export function getPlayersWithDealerLast<T extends PlayerModel>(players: T[], round: number): T[] {
  const playerCount: number = players.length;
  const firstDealer: number = players.findIndex(({first}) => first);
  const currentDealer: number = (firstDealer + round) % playerCount;
  const result: T[] = [];
  for (let index: number = 0; index < playerCount; index++) {
    result.push(players[(index + currentDealer + 1) % playerCount]);
  }
  return result;
}

