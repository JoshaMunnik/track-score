// region imports

import React from "react";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {LargeText} from "../../../components/styled/text/LargeText.tsx";

// endregion

// region local

type IndividualGameTotalRowProps = Readonly<{
  scores: number[];
  winners: boolean[];
}>;

// endregion

// region exports

export function IndividualGameTotalRow({scores, winners}: IndividualGameTotalRowProps) {
  return (
    <React.Fragment key={-2}>
      <GridItem
        borderTop
        borderRight
      >
        <LargeText right>
          <strong>+</strong>
        </LargeText>
      </GridItem>
      {scores.map((score, index) => (
        <GridItem
          alternate={winners[index]}
          key={index}
          borderTop
          borderRight={index < scores.length - 1}
        >
          <NormalText right>
            <strong>{score}</strong>
          </NormalText>
        </GridItem>
      ))}
    </React.Fragment>
  );
}

// endregion
