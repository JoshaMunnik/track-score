// region imports

import type {TeamConfigurationModel} from "../models/TeamConfigurationModel.ts";
import type {TeamPlayerModel} from "../models/TeamPlayerModel.ts";
import React from "react";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {RowIndex} from "../../../components/styled/text/RowIndex.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {TbCards} from "react-icons/tb";
import {getPlayerName} from "../../../tools/playerTools.ts";
import {NumberField} from "../../../components/styled/form/NumberField.tsx";

// endregion

// region local

type TeamScoringPlayerProps = Readonly<{
  index: number,
  configuration: TeamConfigurationModel,
  dealer: TeamPlayerModel,
  player: TeamPlayerModel,
  players: TeamPlayerModel[],
  teamOffset: number,
  onChange: (value: number) => void,
  scoringRound: number
}>;

// endregion

// region exports

export function TeamScoringPlayer({
  configuration: {scoreInterval, teamCount, trackDealer, useScoreInterval},
  dealer,
  index,
  onChange,
  player,
  players,
  scoringRound,
  teamOffset
}: TeamScoringPlayerProps) {
  return <React.Fragment>
    <GridItem
      horizontalAlign={AlignItem.End}
      verticalAlign={AlignItem.Center}
      alternate={index % 2 !== 0}
    >
      <RowIndex index={index + 1}/>
    </GridItem>
    <GridItem
      alternate={index % 2 !== 0}
      verticalAlign={AlignItem.Center}
    >
      <NormalText>
        {trackDealer && (dealer === player) && <TbCards/>}
        {getPlayerName(player, players.indexOf(player))}
      </NormalText>
    </GridItem>
    <GridItem
      alternate={index % 2 !== 0}
      verticalAlign={AlignItem.Center}
      horizontalAlign={AlignItem.Center}
    >
      <NormalText>{1 + (index + teamOffset) % teamCount}</NormalText>
    </GridItem>
    <GridItem
      alternate={index % 2 !== 0}
      verticalAlign={AlignItem.Center}
    >
      <NumberField
        onChange={onChange}
        step={useScoreInterval ? scoreInterval : 1}
        value={player.scores[scoringRound]}
      />
    </GridItem>
  </React.Fragment>;
}

// endregion
