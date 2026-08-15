// region imports

import {Row} from "../styled/layout/Row.tsx";
import {Spacing} from "../../types/enums/ui/Spacing.ts";
import {InputField} from "../styled/form/InputField.tsx";
import {IconButton} from "../styled/button/IconButton.tsx";
import {BsThreeDots} from "react-icons/bs";
import {AlignItem} from "../../types/enums/ui/AlignItem.ts";
import React, {useState} from "react";
import {Popup} from "../styled/popup/Popup.tsx";
import {Column} from "../styled/layout/Column.tsx";
import {Button} from "../styled/button/Button.tsx";
import {ButtonType} from "../../types/enums/ui/ButtonType.ts";

// endregion

// region local

type SelectionFieldProps = Readonly<{
  /**
   * Index of selected item
   */
  currentIndex: number;

  /**
   * Values to show
   */
  values: string[];

  /**
   * This callback is called when the user selects a new value
   */
  onChange: (index: number) => void;

  /**
   * When true, the field is disabled and cannot be interacted with
   */
  disabled?: boolean;
}>;

// endregion

// region exports

/**
 * This component shows a value with a button to change the value with a popup list.
 */
export function SelectionField(
  {currentIndex, values, onChange, disabled = false}: SelectionFieldProps
) {
  const [showList, setShowList] = useState(false);
  const rows: React.ReactNode[] = [];
  values.forEach((entry, index) => {
    rows.push(
      <Button type={ButtonType.Secondary} key={index} onClick={() => {
        setShowList(false);
        onChange(index);
      }}>
        {entry ?? index}
      </Button>
    );
  });
  return (
    <>
      <Row alignCrossAxis={AlignItem.Stretch} gap={Spacing.Tiny}>
        <InputField
          value={values[currentIndex]}
          readonly
          disabled={disabled}
          onClick={() => setShowList(true)}
        />
        <IconButton
          onClick={() => setShowList(true)}
          disabled={disabled}
        >
          <BsThreeDots/>
        </IconButton>
      </Row>
      <Popup
        open={showList}
        onClose={() => setShowList(false)}
      >
        <Column
          gap={Spacing.Tiny}
          alignCrossAxis={AlignItem.Stretch}
          padding={Spacing.Normal}
        >
          {rows}
        </Column>
      </Popup>
    </>
  );
}

// endregion