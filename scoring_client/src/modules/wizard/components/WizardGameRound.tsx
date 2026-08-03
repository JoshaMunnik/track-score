// region imports

import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {SmallText} from "../../../components/styled/text/SmallText.tsx";
import {DistributeContent} from "../../../types/enums/ui/DistributeContent.ts";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {Size} from "../../../types/enums/ui/Size.ts";

// endregion

// region local

type WizardGameRoundProps = Readonly<{
  round: number;
  onClick?: () => void;
  borderBottom?: boolean;
}>;

// endregion

// region exports

export function WizardGameRound({
  round,
  onClick,
  borderBottom = true
}: WizardGameRoundProps) {
  return (
    <GridItem
      onClick={onClick}
      borderRight
      borderBottom={borderBottom}
    >
      <Column
        distributeMainAxis={DistributeContent.Center}
        alignCrossAxis={AlignItem.End}
        height={Size.Full}>
        <SmallText>
          {round + 1}
        </SmallText>
      </Column>
    </GridItem>
  );
}

// endregion
