// region imports

import type {TichuTeamRoundModel} from "./TichuTeamRoundModel.ts";

// endregion

// region exports

/**
 * The data for a tichu round
 */
export type TichuRoundModel = Readonly<{
  /**
   * The score for each team
   */
  teams: TichuTeamRoundModel[]
}>;

// endregion
