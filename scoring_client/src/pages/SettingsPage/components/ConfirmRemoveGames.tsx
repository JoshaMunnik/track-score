// region imports

import {ConfirmPopup} from "../../../components/popup/ConfirmPopup.tsx";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";

// endregion

// region local

type ConfirmRemoveGamesProps = Readonly<{
  open: boolean;
  onClose: (confirm: boolean) => void;
}>;

// endregion

// region exports

export function ConfirmRemoveGames({open, onClose}: ConfirmRemoveGamesProps) {
  return (
    <ConfirmPopup
      onClose={onClose}
      open={open}
      confirmType={ButtonType.Danger}
      confirmCaption={"Yes, remove"}
    >
      Removing games can not be undone, continue with the removal?
    </ConfirmPopup>
  );
}

// endregion
