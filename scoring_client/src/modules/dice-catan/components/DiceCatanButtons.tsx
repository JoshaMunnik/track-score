// region imports

import {useDiceCatanStore} from "../store/useDiceCatanStore.ts";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {Button} from "../../../components/styled/button/Button.tsx";
import {Size} from "../../../types/enums/ui/Size.ts";
import {DistributeContent} from "../../../types/enums/ui/DistributeContent.ts";

// endregion

// region local

type DiceCatanButtonsProps = Readonly<{
  onRoll(): void;
  onMoveBarbarians(): void;
  onRestart(): void;
}>;

// endregion

// region exports

export function DiceCatanButtons({onRoll, onMoveBarbarians, onRestart}: DiceCatanButtonsProps) {
  const {trackBarbarians} = useDiceCatanStore();
  return (
    <Row gap={Spacing.Normal} width={Size.Full} distributeMainAxis={DistributeContent.Center}>
      <Button onClick={onRoll}>
        Roll dice
      </Button>
      <Button onClick={onMoveBarbarians} disabled={!trackBarbarians}>
        Move ship
      </Button>
      <Button onClick={onRestart}>
        Restart
      </Button>
    </Row>
  )
}

// endregion