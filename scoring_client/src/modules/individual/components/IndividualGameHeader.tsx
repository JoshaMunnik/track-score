// region imports

import type {IndividualPlayerModel} from "../models/IndividualPlayerModel.ts";
import React from "react";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {getPlayerName} from "../../../tools/playerTools.ts";

// endregion

// region local

type IndividualGameHeaderProps = Readonly<{
  players: IndividualPlayerModel[];
  ranks: string[];
  playerStatuses: string[];
  winners: boolean[];
  hasScore: boolean;
  hasStatus: boolean;
}>;

// endregion

// region exports

export function IndividualGameHeader({
  players,
  ranks,
  playerStatuses,
  winners,
  hasScore,
  hasStatus
}: IndividualGameHeaderProps) {
  return (
    <React.Fragment key={-1}>
      <GridItem borderBottom borderRight></GridItem>
      {players.map((player, index) => (
        <GridItem
          key={index}
          winner={winners[index]}
          borderBottom
          borderRight={index < players.length - 1}
        >
          <Column alignCrossAxis={AlignItem.Center}>
            {
              hasScore &&
              <NormalText>
                {ranks[index]}
              </NormalText>
            }
            <NormalText>
              {getPlayerName(player, players)}
            </NormalText>
            {
              hasStatus &&
              <NormalText>
                <em>{playerStatuses[index]}</em>
              </NormalText>
            }
          </Column>
        </GridItem>
      ))}
    </React.Fragment>
  );
}

// endregion