import type {StateCreator} from "zustand";
import type {MainStore} from "./MainStore.ts";
import type {GeneralSlice, GeneralState} from "./GeneralSlice.ts";

export const initialGeneralState: GeneralState = {
  firstVisitPage: false,
  useWakeLock: true,
};

export const createGeneralSlice: StateCreator<
  MainStore,
  [], // Middleware types (leave empty if not using any middleware here)
  [],
  GeneralSlice
> = (set) => ({
  ...initialGeneralState,

  viewedFirstVisitPage: () => set({
    firstVisitPage: true,
  }),

  setUseWakeLock: (value) => set({
    useWakeLock: value,
  }),
});
