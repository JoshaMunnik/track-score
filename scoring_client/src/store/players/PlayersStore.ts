// region imports

import type {PlayerModel} from "../../types/models/PlayerModel.ts";

// endregion

// region exports

export type PlayersState<T extends PlayerModel> = Readonly<{
  /**
   * List of players in the current game.
   */
  players: T[];
}>;

export type PlayersActions<T extends PlayerModel> = Readonly<{
  /**
   * Adds a new player instance to the {@link players} list. Set {@link restart} to `true` to
   * restart the game.
   */
  addPlayer(player: T, restart?: boolean): void;

  /**
   * This method will create a copy of players if needed before assigning it to the store.
   *
   * @param players
   */
  updatePlayers(players: T[]): void;

  /**
   * Removes all players from the {@link players} list. This method will also reset the active state
   * of the game to `false`.
   */
  removeAllPlayers(): void;

  /**
   * Change the name of a certain player.
   *
   * @param index
   * @param name
   */
  changePlayerName(index: number, name: string): void;

  /**
   * Selects a player to be the first player of the game.
   *
   * @param index
   */
  selectFirstPlayer(index: number): void;

  /**
   * Removes a player from the {@link players} list by index.
   *
   * @param index
   */
  removePlayer(index: number): void;

  /**
   * Swaps two players.
   *
   * @param first
   * @param second
   */
  swapPlayers(first: number, second: number): void;

  /**
   * Returns `true` if the active state is reset to `false` when calling actions that modify
   * the player's list.
   */
  willResetActive(): boolean;
}>;


export type PlayersStore<T extends PlayerModel> = PlayersState<T> & PlayersActions<T>;

// endregion