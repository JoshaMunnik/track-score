// region imports

import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import React from "react";
import {TeamGameRound} from "./TeamGameRound.tsx";
import type {TeamConfigurationModel} from "../models/TeamConfigurationModel.ts";
import type {TeamPlayerModel} from "../models/TeamPlayerModel.ts";

// endregion

// region local

export type TeamGamePlayedRoundProps = Readonly<{
  configuration: TeamConfigurationModel;
  players: TeamPlayerModel[];
  round: number;
  score: boolean;
  winners: boolean[];
  onClick?: () => void;
}>;

// endregion

// region exports

export function TeamGamePlayedRound({
  configuration,
  players,
  round,
  score,
  winners,
  onClick
}: TeamGamePlayedRoundProps) {
  return (
    <React.Fragment>
      <TeamGameRound round={round} onClick={onClick}/>
      {players.map((player, index) => (
        <GridItem
          key={index}
          onClick={onClick}
          winner={winners[Math.floor(index / configuration.playerCount)]}
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
