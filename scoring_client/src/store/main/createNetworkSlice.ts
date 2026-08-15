import type {StateCreator} from "zustand";
import type {MainStore} from "./MainStore.ts";
import type {NetworkSlice, NetworkState} from "./NetworkSlice.ts";

export const initialNetworkState: NetworkState = {
  sendingGameSession: false,
  retrievingGameSession: false,
};

export const createNetworkSlice: StateCreator<
  MainStore,
  [], // Middleware types (leave empty if not using any middleware here)
  [],
  NetworkSlice
> = (set) => ({
  ...initialNetworkState,

  startSendingGameSession: () => set({
    sendingGameSession: true,
  }),

  stopSendingGameSession: () => set({
    sendingGameSession: false,
  }),

  startRetrievingGameSession: () => set({
    retrievingGameSession: true,
  }),

  stopRetrievingGameSession: () => set({
    retrievingGameSession: false,
  }),
});
