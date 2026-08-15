// region imports

import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {LargeText} from "../../../components/styled/text/LargeText.tsx";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";

// endregion

// region props

type TichuGameTotalsRowProps = Readonly<{
  scores: number[];
  winners: boolean[];
}>;

// endregion

// region exports

export function TichuGameTotalsRow({scores, winners}: TichuGameTotalsRowProps) {
  return (
    <>
      <GridItem borderRight borderTop>
        <LargeText><strong>+</strong></LargeText>
      </GridItem>
      <GridItem borderTop winner={winners[0]}>
        <NormalText right>
          <strong>{scores[0]}</strong>
        </NormalText>
      </GridItem>
      <GridItem borderTop borderRight winner={winners[0]}>
      </GridItem>
      <GridItem borderTop winner={winners[1]}>
        <NormalText right>
          <strong>{scores[1]}</strong>
        </NormalText>
      </GridItem>
      <GridItem borderTop winner={winners[1]}>
      </GridItem>
    </>
  );
}

// endregion