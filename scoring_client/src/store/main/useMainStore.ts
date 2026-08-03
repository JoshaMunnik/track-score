// region imports

import {create} from "zustand/react";
import type {MainStore} from "./MainStore.ts";
import {createQrCodeSlice, initialQrCodeState} from "./createQrCodeSlice.ts";
import {createGameSessionSlice, initialGameSessionState} from "./createGameSessionSlice.ts";
import {createNetworkSlice, initialNetworkState} from "./createNetworkSlice.ts";
import {createPlayerNameSlice, initialPlayerNameState} from "./createPlayerNameSlice.ts";
import {withDevtoolsAndPersist} from "../middleware/withDevtoolsAndPersist.ts";
import {createGeneralSlice, initialGeneralState} from "./createGeneralSlice.ts";

// endregion

// region exports

export const useMainStore = create<MainStore>()(
  withDevtoolsAndPersist('main', (set, get, store) => ({
    ...createGameSessionSlice(set, get, store),
    ...createNetworkSlice(set, get, store),
    ...createPlayerNameSlice(set, get, store),
    ...createQrCodeSlice(set, get, store),
    ...createGeneralSlice(set, get, store),

    reset: () => set({
      ...initialGameSessionState,
      ...initialNetworkState,
      ...initialPlayerNameState,
      ...initialQrCodeState,
      ...initialGeneralState,
    }),
  }))
);

// endregion