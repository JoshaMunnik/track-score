// region imports

import type {GameActions, GameState} from "../game/GameStore.ts";
import type {GameType} from "../../types/enums/GameType.ts";

// endregion

// region exports

/**
 * Adds additional fields used to store a game state in the local storage.
 */
export type StorableGameState = GameState & Readonly<{
  /**
   * Unique id for the game session
   */
  gameSessionId: string;

  /**
   * True when a game has finished (it is still active) and shows the final results.
   */
  finished: boolean;
}>;

export type StorableGameActions = GameActions & Readonly<{
  /**
   * Gets the type of the game used when storing or sharing the game
   */
  getType(): GameType;

  /**
   * Gets a description of the current game state, used when storing the game.
   */
  getSummary(): string;

  /**
   * Get the game state as a base64 encoded string.
   */
  getData(): string;

  /**
   * Sets the game state to the base64 encoded data as returned by {@link getData}.
   */
  setData(data: string): void;
}>;

export type StorableGameStore = StorableGameState & StorableGameActions;

// endregion
