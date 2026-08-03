// region imports

import type {QrCodeSlice} from "./QrCodeSlice.ts";
import type {PlayerNameSlice} from "./PlayerNameSlice.ts";
import type {GameSessionSlice} from "./GameSessionSlice.ts";
import type {NetworkSlice} from "./NetworkSlice.ts";
import type {GeneralSlice} from "./GeneralSlice.ts";

// endregion

// region exports

/**
 * Global actions, not related to any specific slice.
 */
export type MainActions = {
  /**
   * Reset the store to its initial state.
   */
  reset(): void;
}

/**
 * Combine all slices into a single store.
 */
export type MainStore = PlayerNameSlice & QrCodeSlice & GameSessionSlice & NetworkSlice &
  GeneralSlice & MainActions;

// endregion