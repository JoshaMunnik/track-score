// region imports

import type {IndividualPlayerModel} from "../models/IndividualPlayerModel.ts";
import React from "react";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {IndividualGameRound} from "./IndividualGameRound.tsx";

// endregion

// region local

type IndividualGamePlayedRoundProps = Readonly<{
  players: IndividualPlayerModel[];
  round: number;
  score: boolean;
  winners: boolean[];
  onClick?: () => void;
}>;

// endregion

// region exports

export function IndividualGamePlayedRound({
  players,
  round,
  score,
  winners,
  onClick
}: IndividualGamePlayedRoundProps) {
  return (
    <React.Fragment key={round}>
      <IndividualGameRound round={round} onClick={onClick}/>
      {players.map((player, index) => (
        <GridItem
          key={index}
          onClick={onClick}
          winner={winners[index]}
          borderBottom
          borderRight={index < players.length - 1}
        >
          <NormalText right>
            {score ? player.scores[round] ?? 0 : <>&nbsp;</>}
          </NormalText>
        </GridItem>
      ))}
    </React.Fragment>
  );
}

// endregion
