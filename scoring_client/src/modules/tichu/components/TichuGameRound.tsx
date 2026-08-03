// region imports

import {DistributeContent} from "../../../types/enums/ui/DistributeContent.ts";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {Size} from "../../../types/enums/ui/Size.ts";
import {SmallText} from "../../../components/styled/text/SmallText.tsx";

// endregion

// region local

type TichuGameRoundProps = Readonly<{
  round: number;
  borderBottom?: boolean;
}>;

// endregion

// region exports

export function TichuGameRound({round, borderBottom = true}: TichuGameRoundProps) {
  return (
    <GridItem
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
