// region imports

import type {ResettableActions} from "../resettable/ResettableActions.ts";

// endregion

// region exports

/**
 * Base type for stores that contain a game state.
 */
export type GameState = Readonly<{
  /**
   * When `true` a game is active.
   */
  active: boolean;
}>;

export type GameActions = ResettableActions & Readonly<{
  /**
   * Sets the {@link active} state of the game to `false`.
   */
  resetGame(): void;
}>;

export type GameStore = GameState & GameActions;

// endregion