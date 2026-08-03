import {ConfirmPopup} from "../../../popup/ConfirmPopup.tsx";
import {ButtonType} from "../../../../types/enums/ui/ButtonType.ts";

type ConfigurationDeleteConfirmPopupProps = Readonly<{
  open: boolean;
  onClose: (confirm: boolean) => void;
  configurationName: string;
  active: boolean;
}>;

export function ConfigurationDeleteConfirmPopup(
  {open, onClose, configurationName, active}: ConfigurationDeleteConfirmPopupProps
) {

  return (
    <ConfirmPopup
      onClose={onClose}
      open={open}
      confirmType={ButtonType.Danger}
      confirmCaption="Yes, delete"
    >
      Delete the configuration "{configurationName}"?
      {active ? ' This will also restart the game.' : ''}
    </ConfirmPopup>
  );
}