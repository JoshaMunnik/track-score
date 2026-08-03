import {ConfirmPopup} from "../../../popup/ConfirmPopup.tsx";

type ConfirmAddPlayerPopupProps = Readonly<{
  open: boolean;
  onClose: (confirm: boolean) => void;
}>;

export function ConfirmAddPlayerPopup({
  open,
  onClose
}: ConfirmAddPlayerPopupProps) {
  return (
    <ConfirmPopup
      open={open}
      onClose={onClose}
      confirmCaption="Yes, add player"
    >
      Adding a new player, will restart the game. Are you sure you want to continue?
    </ConfirmPopup>
  );
}