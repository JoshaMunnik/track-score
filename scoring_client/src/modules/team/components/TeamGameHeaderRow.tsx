// region imports

import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {SmallText} from "../../../components/styled/text/SmallText.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import React from "react";
import type {TeamConfigurationModel} from "../models/TeamConfigurationModel.ts";

// endregion

// region local

type TeamHeaderRowProps = Readonly<{
  configuration: TeamConfigurationModel;
  ranks: string[];
  winners: boolean[];
  hasScore: boolean;
}>;

// endregion

// region exports

export function TeamGameHeaderRow({configuration, ranks, winners, hasScore}: TeamHeaderRowProps) {
  return (
    <React.Fragment>
      <GridItem borderRight borderBottom>
      </GridItem>{
      Array.from({length: configuration.teamCount}, (_, index) => (
        <GridItem
          borderRight={index < configuration.teamCount - 1}
          borderBottom
          key={index}
          winner={winners[index]}
          span={configuration.playerCount}
        >
          <Column alignCrossAxis={AlignItem.Center}>
            {
              hasScore &&
              <NormalText>
                {ranks[index]}
              </NormalText>
            }
            <SmallText>
              team {index + 1}
            </SmallText>
          </Column>
        </GridItem>

      ))}
    </React.Fragment>
  );
}

// endregion