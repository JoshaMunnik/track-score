// region imports

import {devtools} from "zustand/middleware";
import {create} from "zustand/react";
import type {ZustandStore} from "../../types/store/ZustandStore.ts";
import type {StorableGameActions} from "../storable/StorableGameStore.ts";
import type {SharableGameState, SharableGameStore} from "./SharableGameStore.ts";

// endregion

// region local

const initialState: SharableGameState = {
  shareCode: '',
  viewing: false,
}

// endregion

// region exports

/**
 * Creates a store for games that can share itself so other users can view the game session.
 *
 * A separate store is used, since the data in this store does not have to be persisted or to
 * be shared with other clients.
 *
 * @param name
 *   Value to use for the devtools store options.
 * @param gameStore
 *   Store containing the data for the game.
 */
export function createSharableGameStore(
  name: string,
  gameStore: ZustandStore<StorableGameActions>
) {
  return create<SharableGameStore>()(
    devtools(
      (set) => ({
        ...initialState,

        setShareCode: (code) => set({
          shareCode: code,
          viewing: false
        }),

        setViewingCode: (code) => set({
          shareCode: code,
          viewing: true,
        }),

        stopSharing: () => set(initialState),

        getGameStore: () => gameStore,
      }),
      {
        store: name,
      })
  );
}

// endregion