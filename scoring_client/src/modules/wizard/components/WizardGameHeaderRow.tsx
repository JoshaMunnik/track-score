// region imports

import React from "react";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import type {WizardPlayerModel} from "../models/WizardPlayerModel.ts";
import {getPlayerName} from "../../../tools/playerTools.ts";

// endregion

// region local

type WizardGameHeaderRowProps = Readonly<{
  players: WizardPlayerModel[];
  ranks: string[];
  playerStatuses: string[];
  winners: boolean[];
  hasScore: boolean;
  hasStatus: boolean;
}>;

// endregion

// region exports

export function WizardGameHeaderRow({
  players,
  ranks,
  playerStatuses,
  winners,
  hasScore,
  hasStatus
}: WizardGameHeaderRowProps) {
  return (
    <React.Fragment key={-1}>
      <GridItem borderRight borderBottom></GridItem>
      {players.map((player, index) => {
        return (
          <GridItem
            key={index}
            winner={winners[index]}
            borderBottom
            borderRight={index < players.length - 1}
            span={2}
          >
            <Column>
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
        );
      })}
    </React.Fragment>
  );
}

// endregion