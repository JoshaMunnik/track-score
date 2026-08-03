// region imports

import type {ConfigurationModel} from "../../../types/models/ConfigurationModel.ts";

// endregion

// region exports

/**
 * {@link DiceConfigurationModel} defines the properties for a single dice config.
 */
export type DiceConfigurationModel = ConfigurationModel & Readonly<{
  /**
   * Number of dices
   */
  diceCount: number;

  /**
   * First number on the dice
   */
  startNumber: number;

  /**
   * Last number on the dice
   */
  endNumber: number;

  /**
   * When `true` create one or more groups with all possible combinations and get values from those.
   */
  useGroups: boolean;

  /**
   * Number of roll groups to use
   */
  groupCount: number;

  /**
   * With 2 or more dice, show an extra die with the sum of all dice.
   */
  showTotal: boolean;
}>;

// endregion
