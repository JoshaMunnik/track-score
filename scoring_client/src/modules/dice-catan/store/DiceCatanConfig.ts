/**
 * The part of the state that can be altered via the config dialog
 */
export type DiceCatanConfig = {
  /**
   * True to use pre-rolls
   */
  readonly useGroups: boolean;

  /**
   * Pre-roll group count
   */
  readonly groupCount: number;

  /**
   * Also track barbarians and show attack feedback message when they reach the island
   */
  readonly trackBarbarians: boolean;

  /**
   * Number of moves before the ship reaches the island.
   */
  readonly barbarianShipMoves: number;

  /**
   * When tracking barbarians ignore seven rolls (show next roll) until barbarians have attacked for the first
   * time.
   */
  readonly ignoreSevens: boolean;
}

// endregion
