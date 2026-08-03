import {ConfirmPopup} from "../../../popup/ConfirmPopup.tsx";

type PlayersConfirmRestartPopupProps = Readonly<{
  open: boolean;
  onClose: (confirm: boolean) => void;
}>;

export function PlayersConfirmRestartPopup({open, onClose}: PlayersConfirmRestartPopupProps) {
  return (
    <ConfirmPopup
      open={open}
      onClose={onClose}
      confirmCaption="Yes, restart"
    >
      Are you sure you want to restart? This will remove the current scoring and rounds.
    </ConfirmPopup>
  );
}