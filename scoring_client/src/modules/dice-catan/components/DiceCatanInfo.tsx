// region imports

import {useDiceCatanStore} from "../store/useDiceCatanStore.ts";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {Paper} from "../../../components/page/Paper.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";

// endregion

// region exports

export function DiceCatanInfo() {
  const {
    active,
    rolls,
    trackBarbarians,
    preRolls,
    useGroups,
    barbarianShipPosition,
  } = useDiceCatanStore();
  return (
    <Paper>
      <Column gap={Spacing.Normal}>
        {!active && <NormalText>Press roll dice to start.</NormalText>}
        {
          active &&
          <NormalText>Total: <em>{rolls[0] + rolls[1]}</em></NormalText>
        }
        {
          active && trackBarbarians &&
          <NormalText>
            Barbarian ship position:&nbsp;
            {barbarianShipPosition ? <em>{barbarianShipPosition}</em> : <strong>INVADING!</strong>}
          </NormalText>
        }
        {
          active && useGroups &&
          <NormalText>Fair rolls active, rolls left: <em>{preRolls.length}</em></NormalText>
        }
      </Column>

    </Paper>
  )
}

// endregion