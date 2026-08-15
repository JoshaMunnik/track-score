// region imports

import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import React from "react";
import {getPlayerName} from "../../../tools/playerTools.ts";
import type {TeamConfigurationModel} from "../models/TeamConfigurationModel.ts";
import type {TeamPlayerModel} from "../models/TeamPlayerModel.ts";

// endregion

// region local

type TeamGamePlayerHeaderRowProps = Readonly<{
  configuration: TeamConfigurationModel;
  players: TeamPlayerModel[];
  playerStatuses: string[];
  winners: boolean[];
  hasStatus: boolean;
}>;

// endregion

// region exports

export function TeamGamePlayerHeaderRow({
  configuration,
  players,
  playerStatuses,
  winners,
  hasStatus
}: TeamGamePlayerHeaderRowProps) {
  return (
    <React.Fragment>
      <GridItem borderRight borderBottom>
      </GridItem>
      {players.map((player, index) => {
        return (
          <GridItem
            key={index}
            borderRight={index < players.length - 1}
            borderBottom
            winner={winners[Math.floor(index / configuration.playerCount)]}
          >
            <Column>
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
        );
      })}
    </React.Fragment>
  );
}

// endregion
