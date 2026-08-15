import {ConfirmPopup} from "../../../popup/ConfirmPopup.tsx";
import {ButtonType} from "../../../../types/enums/ui/ButtonType.ts";

type ConfigurationConfirmActionPopupProps = Readonly<{
  open: boolean;
  onClose: (confirm: boolean) => void;
  action: (() => void) | null;
}>;

export function ConfigurationConfirmActionPopup(
  {open, onClose, action}: ConfigurationConfirmActionPopupProps
) {
  function handleConfirm(confirm: boolean) {
    if (confirm && action) {
      action();
    }
    onClose(confirm);
  }

  return (
    <ConfirmPopup
      onClose={handleConfirm}
      open={open}
      confirmType={ButtonType.Danger}
      confirmCaption="Yes, continue"
    >
      This action will restart the game, are you sure?
    </ConfirmPopup>
  );
}