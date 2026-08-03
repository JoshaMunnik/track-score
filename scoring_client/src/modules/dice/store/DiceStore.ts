// region imports

import type {GameActions, GameState} from "../../../store/game/GameStore.ts";
import type {DiceConfigurationModel} from "../models/DiceConfigurationModel.ts";
import type {
  ConfigurationActions,
  ConfigurationState
} from "../../../store/configuration/ConfigurationStore.ts";

// endregion

// region exports

/**
 * Dice store state
 */
export type DiceState = GameState & ConfigurationState<DiceConfigurationModel> & Readonly<{
  /**
   * Current rolls
   */
  rolls: number[];

  /**
   * Array of pre-rolls (only used if useGroups is true)
   */
  preRolls: number[];
}>;

/**
 * Actions to update the store.
 */
export type DiceActions = GameActions & ConfigurationActions<DiceConfigurationModel> & Readonly<{
  /**
   * Rolls the dice and updates the store with the results.
   */
  rollDice(): void;
}>;

export type DiceStore = DiceState & DiceActions;

// endregion
