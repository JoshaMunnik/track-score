// region imports

import React from "react";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import type {WizardPlayerModel} from "../models/WizardPlayerModel.ts";
import {calcWizardScore, calledCorrectWizardRound} from "../tools/wizardTools.ts";
import {Color} from "../../../types/enums/ui/Color.ts";
import {WizardGameRound} from "./WizardGameRound.tsx";

// endregion

// region local

type WizardGamePlayedRoundProps = Readonly<{
  players: WizardPlayerModel[];
  round: number;
  score: boolean;
  bid: boolean;
  winners: boolean[];
  onClick?: () => void;
}>;

// endregion

// region exports

export function WizardGamePlayedRound({
  players,
  round,
  score,
  bid,
  winners,
  onClick
}: WizardGamePlayedRoundProps) {
  const borderBottom = round < (60 / players.length) - 1;
  return (
    <React.Fragment key={round}>
      <WizardGameRound round={round} onClick={onClick} borderBottom={borderBottom} />
      {players.map((player, index) => {
        const isCorrect = !score || calledCorrectWizardRound(player, round);
        return (
          <React.Fragment key={index}>
            <GridItem
              onClick={onClick}
              alternate={winners[index]}
              borderBottom={borderBottom}
              borderRight
              color={isCorrect ? Color.Default : Color.Danger}
            >
              <NormalText
                right
                color={isCorrect ? Color.Default : Color.Danger}
              >
                {score ? calcWizardScore(player, round) : ''}
              </NormalText>
            </GridItem>
            <GridItem
              onClick={onClick}
              alternate={winners[index]}
              borderBottom={borderBottom}
              borderRight={index < players.length - 1}
            >
              <NormalText right>
                {bid ? player.rounds[round].bid : '?'}
              </NormalText>
            </GridItem>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

// endregion