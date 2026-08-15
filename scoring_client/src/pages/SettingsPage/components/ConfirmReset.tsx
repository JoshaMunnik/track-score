// region imports

import {ConfirmPopup} from "../../../components/popup/ConfirmPopup.tsx";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";

// endregion

// region local

type ConfirmResetProps = Readonly<{
  open: boolean;
  onClose: (confirm: boolean) => void;
}>;

// endregion

// region exports

export function ConfirmReset({open, onClose}: ConfirmResetProps) {
  return (
    <ConfirmPopup
      onClose={onClose}
      open={open}
      confirmType={ButtonType.Danger}
      confirmCaption={"Yes, reset"}
    >
      Resetting will remove all stored games, all player names and will restore the configurations
      to their initial values. Continue with the reset?
    </ConfirmPopup>
  );
}

// endregion
