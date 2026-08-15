export type LocationStateModel = {
  /**
   * Data either obtained from the local storage or from the server (see {@link shareCode}).
   *
   * If the data is empty, a new game should be started.
   */
  data: string;

  /**
   * When set, data was obtained from the server
   */
  shareCode?: string;

  /**
   * Sequence id returned when the data was obtained from the server
   */
  sequence?: number;
}