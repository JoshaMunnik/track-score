// region imports

import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {SmallText} from "../../../components/styled/text/SmallText.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";

// endregion

// region local

type TeamGameRoundProps = Readonly<{
  round: number;
  onClick?: () => void;
}>;

// endregion

// region exports

export function TeamGameRound({round, onClick}: TeamGameRoundProps) {
  return (
    <GridItem
      onClick={onClick}
      borderRight
      borderBottom
      verticalAlign={AlignItem.Center}
      horizontalAlign={AlignItem.End}
    >
      <SmallText>
        {round + 1}
      </SmallText>
    </GridItem>
  );
}

// endregion
