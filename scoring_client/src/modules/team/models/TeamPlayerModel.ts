// region imports

import type {PlayerModel} from "../../../types/models/PlayerModel.ts";

// endregion

// region exports

export type TeamPlayerModel = PlayerModel & Readonly<{
  /**
   * The scores the player has achieved in each round.
   */
  scores: number[];
}>;

// endregion
