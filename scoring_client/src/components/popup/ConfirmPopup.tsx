// region imports

import {type PropsWithChildren} from "react";
import {Popup} from "../styled/popup/Popup.tsx";
import {Column} from "../styled/layout/Column.tsx";
import {Row} from "../styled/layout/Row.tsx";
import {Button} from "../styled/button/Button.tsx";
import {ButtonType} from "../../types/enums/ui/ButtonType.ts";
import {Spacing} from "../../types/enums/ui/Spacing.ts";
import {DistributeContent} from "../../types/enums/ui/DistributeContent.ts";
import {Size} from "../../types/enums/ui/Size.ts";
import {Color} from "../../types/enums/ui/Color.ts";

// endregion

// region local types

type ConfirmPopupProps = Readonly<PropsWithChildren<{
  /**
   * Use closed the dialog.
   */
  onClose: (confirm: boolean) => void;

  /**
   * True to show the dialog
   */
  open: boolean;

  /**
   * Caption for the confirm button; default is `Confirm`
   */
  confirmCaption?: string;

  /**
   * Caption for the cancel button; default is `Cancel`
   */
  cancelCaption?: string;

  /**
   * Button type to use for the confirm button; default is {@link ButtonType.Primary}
   */
  confirmType?: ButtonType;
}>>;

// endregion

// region exports

/**
 * Renders a confirmation popup.
 */
export function ConfirmPopup({
  onClose, open, children, confirmCaption = 'Confirm', cancelCaption = 'Cancel',
  confirmType = ButtonType.Success
}: ConfirmPopupProps) {
  function handleClose(confirm: boolean) {
    onClose(confirm);
  }

  return (
    <Popup open={open} onClose={() => onClose(false)}>
      <Column gap={Spacing.Normal} padding={Spacing.Normal} backgroundColor={Color.Light}>
        <div>{children}</div>
        <Row
          distributeMainAxis={DistributeContent.End}
          gap={Spacing.Normal}
          width={Size.Full}
        >
          <Button
            type={confirmType}
            onClick={() => handleClose(true)}
          >
            {confirmCaption}
          </Button>
          <Button
            type={ButtonType.Secondary}
            onClick={() => handleClose(false)}
          >
            {cancelCaption}
          </Button>
        </Row>
      </Column>
    </Popup>
  );
}

// endregion