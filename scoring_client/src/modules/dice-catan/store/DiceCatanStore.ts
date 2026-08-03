// region imports

import type {DiceCatanConfig} from "./DiceCatanConfig.ts";
import type {GameActions, GameState} from "../../../store/game/GameStore.ts";

// endregion

// region exports

/**
 * The state that is managed by the store.
 */
export type DiceCatanState = Readonly<GameState & DiceCatanConfig & {
  /**
   * Current rolls
   */
  readonly rolls: number[];

  /**
   * Array of pre-rolls (only used if useGroups is true)
   */
  readonly preRolls: number[];

  /**
   * Current position of the barbarians ship; when 0 the barbarians are invading. The range is
   * {@link DiceCatanConfig.barbarianShipMoves}-1 to 0 (inclusive).
   */
  readonly barbarianShipPosition: number;

  /**
   * When true the barbarians have invaded at least once (the ship position reached 0).
   */
  readonly invaded: boolean;
}>;

/**
 * Actions to update the store.
 */
export type DiceCatanActions = GameActions & {
  /**
   * Updates the store using the config. This will reset the game to an inactive state.
   *
   * @param config
   */
  setConfig(config: DiceCatanConfig): void;

  /**
   * Moves the barbarian ship one step closer to the island.
   */
  moveBarbarianShip(): void;

  /**
   * Rolls the dice and updates the store with the results. Depending on the results, the barbarian
   * ship might also move.
   */
  rollDice(): void;
}

export type DiceCatanStore = DiceCatanState & DiceCatanActions;

// endregion