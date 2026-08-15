// region imports

import {Row} from "../styled/layout/Row.tsx";
import {Spacing} from "../../types/enums/ui/Spacing.ts";
import {InputField, type InputFieldProps} from "../styled/form/InputField.tsx";
import {IconButton} from "../styled/button/IconButton.tsx";
import {BsThreeDots} from "react-icons/bs";
import {useMainStore} from "../../store/main/useMainStore.ts";
import {Size} from "../../types/enums/ui/Size.ts";
import {AlignItem} from "../../types/enums/ui/AlignItem.ts";

// endregion

// region local

type PlayerNameFieldProps = InputFieldProps;

// endregion

// region exports

/**
 * This control shows an input together with a button to select a player name from a list of
 * previously entered player names.
 */
export function PlayerNameField({onChange, ...others}: PlayerNameFieldProps) {
  const showPlayerNames = useMainStore(
    (state) => state.showPlayerNames
  );
  const playerNames = useMainStore(
    (state) => state.playerNames
  );
  return (
    <Row gap={Spacing.Tiny} width={Size.Full} alignCrossAxis={AlignItem.Stretch}>
      <Row flex={1} alignCrossAxis={AlignItem.Stretch}>
        <InputField
          onChange={onChange}
          {...others}
        />
      </Row>
      <IconButton
        onClick={() => showPlayerNames((value) => onChange?.(value))}
        disabled={playerNames.length === 0}
      >
        <BsThreeDots/>
      </IconButton>
    </Row>
  );
}

// endregion