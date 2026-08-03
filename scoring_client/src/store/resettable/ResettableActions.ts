
export type ResettableActions = Readonly<{
  /**
   * Resets the store to an initial state.
   */
  reset(): void;
}>;