// region imports

import {Popup} from "../styled/popup/Popup.tsx";
import {Button} from "../styled/button/Button.tsx";
import {Spacing} from "../../types/enums/ui/Spacing.ts";
import {Column} from "../styled/layout/Column.tsx";
import {AlignItem} from "../../types/enums/ui/AlignItem.ts";
import {ButtonType} from "../../types/enums/ui/ButtonType.ts";
import {Size} from "../../types/enums/ui/Size.ts";

// endregion

// region local types

type ListPopupProps = Readonly<{
  /**
   * When `true` shows the popup.
   */
  open: boolean;

  /**
   * Values to show within the popup
   */
  values: string[];

  /**
   * This method is called when the user selected an item.
   */
  onSelect: (index: number) => void;

  /**
   * This method is called when the user closed the popup without selecting an item.
   */
  onClose: () => void;
}>;

// endregion

// region exports

/**
 * {@link ListPopup} shows a list of values that the user can select one of.
 */
export function ListPopup({open, values, onSelect, onClose}: ListPopupProps) {
  return (
    <Popup open={open} onClose={onClose}>
      <Column
        gap={Spacing.Tiny}
        alignCrossAxis={AlignItem.Stretch}
        padding={Spacing.Normal}
      >
        {values.map((value, index) => (
          <Button
            key={value}
            onClick={() => onSelect(index)}
            type={ButtonType.Primary}
            width={Size.Full}
          >
            {value}
          </Button>
        ))}
      </Column>
    </Popup>
  );
}

// endregion