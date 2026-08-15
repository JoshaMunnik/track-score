// region imports

import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {LargeText} from "../../../components/styled/text/LargeText.tsx";
import React from "react";
import type {TeamConfigurationModel} from "../models/TeamConfigurationModel.ts";

// endregion

// region local

export type TeamGameTotalRowProps = Readonly<{
  configuration: TeamConfigurationModel;
  scores: number[];
  winners: boolean[];
}>;

// endregion

// region exports

export function TeamGameTotalRow({configuration, scores, winners}: TeamGameTotalRowProps) {
  return (
    <React.Fragment>
      <GridItem
        borderTop
        borderRight
      >
        <LargeText right><strong>+</strong></LargeText>
      </GridItem>
      {scores.map((score, index) => (
        <GridItem
          key={index}
          borderTop
          borderRight={index < scores.length - 1}
          winner={winners[index]}
          span={configuration.playerCount}
        >
          <NormalText right><strong>{score}</strong></NormalText>
        </GridItem>
      ))}
    </React.Fragment>
  );
}

// endregion
