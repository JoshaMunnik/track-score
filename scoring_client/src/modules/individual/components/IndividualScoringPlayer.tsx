// region imports

import type {PlayerModel} from "../../../types/models/PlayerModel.ts";
import React from "react";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {RowIndex} from "../../../components/styled/text/RowIndex.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {TbCards} from "react-icons/tb";
import {getPlayerName} from "../../../tools/playerTools.ts";
import {NumberField} from "../../../components/styled/form/NumberField.tsx";
import type {IndividualConfigurationModel} from "../models/IndividualConfigurationModel.ts";

// endregion

// region local

type IndividualScoringPlayerProps = Readonly<{
  index: number,
  configuration: IndividualConfigurationModel,
  dealer: PlayerModel & Readonly<{ scores: number[] }>,
  player: PlayerModel & Readonly<{ scores: number[] }>,
  players: (PlayerModel & Readonly<{ scores: number[] }>)[],
  scores: number[],
  onChange: (value: number) => void,
  scoringRound: number
}>;

// endregion

// region exports

export function IndividualScoringPlayer({
  index,
  configuration,
  dealer,
  player,
  players,
  scores,
  onChange,
  scoringRound
}: IndividualScoringPlayerProps) {
  return <React.Fragment>
    <GridItem
      horizontalAlign={AlignItem.End}
      verticalAlign={AlignItem.Center}
      alternate={index % 2 === 1}
    >
      <RowIndex index={index + 1}/>
    </GridItem>
    <GridItem
      alternate={index % 2 === 1}
      verticalAlign={AlignItem.Center}
    >
      <NormalText>
        {configuration.trackDealer && (dealer === player) && <TbCards/>}
        {getPlayerName(player, players.indexOf(player))}
      </NormalText>
    </GridItem>
    <GridItem
      verticalAlign={AlignItem.Center}
      horizontalAlign={AlignItem.End}
      alternate={index % 2 === 1}
    >
      <NormalText>
        {scores[index]}
      </NormalText>
    </GridItem>
    <GridItem
      alternate={index % 2 === 1}
    >
    </GridItem>
    <GridItem
      alternate={index % 2 === 1}
    >
      <NumberField
        onChange={onChange}
        step={configuration.useScoreInterval ? configuration.scoreInterval : 1}
        value={player.scores[scoringRound]}
      />
    </GridItem>
  </React.Fragment>;
}

// endregion