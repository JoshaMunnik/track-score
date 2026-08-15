// region exports

/**
 * The state definition used for the wizard part in the store
 */
export type WizardConfig = {
  /**
   * When true, do not allow the total number of bids to be equal to the number of cards for
   * that round.
   */
  checkTotalBids: boolean;

  /**
   * Minimum card count to start checking the total bids with
   */
  checkTotalBidsCount: number;
}

// endregion
