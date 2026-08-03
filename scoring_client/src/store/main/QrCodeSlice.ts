// region imports

import type {ZustandStore} from "../../types/store/ZustandStore.ts";
import type {SharableGameStore} from "../sharable/SharableGameStore.ts";

// endregion

// region exports

export type QrCodeState = {
  /**
   * When true, show the QR sharing code popup; {@link sharableGameStore} must also be set
   */
  getQrCodeVisible: boolean;

  /**
   * Store to update when getting the QR code
   */
  sharableGameStore: ZustandStore<SharableGameStore> | null;
};

export type QrCodeActions = {
  /**
   * Shows the QR sharing code popup and sets the store to update when getting the QR code.
   */
  showGetQrCode(store: ZustandStore<SharableGameStore>): void;

  /**
   * Hides the QR sharing code popup and clears the store to update when getting the QR code.
   */
  hideGetQrCode(): void;
};

export type QrCodeSlice = QrCodeState & QrCodeActions;

// endregion