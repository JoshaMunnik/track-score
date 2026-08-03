// region imports

import type {TichuResultType} from "../type/TichuResultType.ts";

// endregion

// region exports

/**
 * The score data for a round for a team
 */
export type TichuTeamRoundModel = Readonly<{
  /**
   * When true, one of the players called grand tichu
   */
  grandTichu: boolean;

  /**
   * When true, one of the players called tichu
   */
  tichu0: boolean;

  /**
   * When true, the other player also called tichu
   */
  tichu1: boolean;

  /**
   * When true, both players finished before the other team
   */
  first: boolean;

  /**
   * The tichu result of the round
   */
  result: TichuResultType;

  /**
   * The scores from the cards
   */
  cardScore: number;
}>;

// endregion
