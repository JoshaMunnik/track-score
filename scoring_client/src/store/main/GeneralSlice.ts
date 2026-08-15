export type GeneralState = {
  /**
   * When true, the user viewed the initial first page.
   */
  firstVisitPage: boolean;

  /**
   * When true, use wake lock service while a game is active (to prevent device turning off the
   * display).
   */
  useWakeLock: boolean;
};

export type GeneralActions = {
  /**
   * Marks that the user has viewed the initial first page.
   */
  viewedFirstVisitPage(): void;

  /**
   * Updates the {@link useWakeLock} state.
   */
  setUseWakeLock(value: boolean): void;
};

export type GeneralSlice = GeneralState & GeneralActions;