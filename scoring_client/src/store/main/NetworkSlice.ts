export type NetworkState = {

  /**
   * True while data is being sent to the server
   */
  sendingGameSession: boolean;

  /**
   * True while data is being retrieved from the server
   */
  retrievingGameSession: boolean;
};

export type NetworkActions = {
  /**
   * Starts sending the game session data to the server. Sets {@link sendingGameSession} to `true`.
   */
  startSendingGameSession(): void;

  /**
   * Stops sending the game session data to the server. Sets {@link sendingGameSession} to `false`.
   */
  stopSendingGameSession(): void;

  /**
   * Starts retrieving the game session data from the server. Sets {@link retrievingGameSession}
   * to `true`.
   */
  startRetrievingGameSession(): void;

  /**
   * Stops retrieving the game session data from the server. Sets {@link retrievingGameSession}
   * to `false`.
   */
  stopRetrievingGameSession(): void;
};

export type NetworkSlice = NetworkState & NetworkActions;