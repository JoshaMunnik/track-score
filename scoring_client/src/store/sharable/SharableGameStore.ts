// region imports

import type {ZustandStore} from "../../types/store/ZustandStore.ts";
import type {StorableGameActions} from "../storable/StorableGameStore.ts";

// endregion

// region exports

export type SharableGameState = {
  /**
   * Code obtained from the server; used to get or store the game state at the server.
   */
  shareCode: string;

  /**
   * When true, the user is tracking a game and should not be able to change it.
   */
  viewing: boolean;
};

export type SharableGameActions = {
  /**
   * Sets the sharing code and sets viewing to `false`. Use this action when requesting a code
   * from within a game.
   */
  setShareCode(shareCode: string): void;

  /**
   * Sets the sharing code and sets viewing to `true`. Use this action when using a code to
   * track a game.
   */
  setViewingCode(shareCode: string): void;

  /**
   * Stop sharing by clearing the shareCode. This method can be used for both sharing and viewing
   * state.
   */
  stopSharing(): void;

  /**
   * Returns the store that contains the data for the current active game (if any).
   */
  getGameStore(): ZustandStore<StorableGameActions>;
}

export type SharableGameStore = SharableGameState & SharableGameActions;

// endregion