// region imports

import React from "react";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import type {WizardPlayerModel} from "../models/WizardPlayerModel.ts";
import {WizardGameRound} from "./WizardGameRound.tsx";

// endregion

// region local

type WizardGameEmptyRoundProps = Readonly<{
  players: WizardPlayerModel[];
  round: number;
}>;

// endregion

// region exports

export function WizardGameEmptyRound({
  players,
  round
}: WizardGameEmptyRoundProps) {
  const borderBottom = round < (60 / players.length) - 1;
  return (
    <React.Fragment key={round}>
      <WizardGameRound round={round} borderBottom={borderBottom}/>
      {players.map((_player, index) => (
        <React.Fragment key={index}>
          <GridItem
            borderBottom={borderBottom}
            borderRight
          >
            <NormalText>
              &nbsp;
            </NormalText>
          </GridItem>
          <GridItem
            borderBottom={borderBottom}
            borderRight={index < players.length - 1}
          >
            <NormalText>
              &nbsp;
            </NormalText>
          </GridItem>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

// endregion