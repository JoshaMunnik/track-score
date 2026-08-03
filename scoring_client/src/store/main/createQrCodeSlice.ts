import type {StateCreator} from "zustand";
import type {MainStore} from "./MainStore.ts";
import type {QrCodeSlice, QrCodeState} from "./QrCodeSlice.ts";

export const initialQrCodeState: QrCodeState = {
  getQrCodeVisible: false,
  sharableGameStore: null,
};

export const createQrCodeSlice: StateCreator<
  MainStore,
  [], // Middleware types (leave empty if not using any middleware here)
  [],
  QrCodeSlice
> = (set) => ({
  ...initialQrCodeState,

  showGetQrCode: (store) => set({
    getQrCodeVisible: true,
    sharableGameStore: store,
  }),

  hideGetQrCode: () => set({
    getQrCodeVisible: false,
    sharableGameStore: null
  }),
});
