// region imports

import type {PlayerModel} from "../../../types/models/PlayerModel.ts";
import type {WizardPlayerRoundModel} from "./WizardPlayerRoundModel.ts";

// endregion

// region exports

/**
 * {@link WizardPlayerModel} extends {@link PlayerModel} and adds round related data.
 */
export type WizardPlayerModel = PlayerModel & {
  /**
   * The number of bids and actual tricks taken.
   */
  rounds: WizardPlayerRoundModel[];

  /**
   * The round the player started playing.
   */
  startRound: number;

  /**
   * The score the player started playing with.
   */
  startScore: number;
}

// endregion
