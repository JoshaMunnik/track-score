// region imports

import type {WizardPlayerModel} from "../models/WizardPlayerModel.ts";
import * as React from "react";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {RowIndex} from "../../../components/styled/text/RowIndex.tsx";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {TbCards} from "react-icons/tb";
import {getPlayerName} from "../../../tools/playerTools.ts";
import {SmallText} from "../../../components/styled/text/SmallText.tsx";
import {WizardScoringRoundScore} from "./WizardScoringRoundScore.tsx";
import {NumberField} from "../../../components/styled/form/NumberField.tsx";

// endregion

// region local

type WizardScoringPlayerProps = Readonly<{
  index: number,
  dealer: WizardPlayerModel,
  player: WizardPlayerModel,
  players: WizardPlayerModel[],
  numbers: number[],
  scoringRound: number,
  onChange: (value: number) => void,
  max: number
}>;

// endregion

// region exports

export function WizardScoringPlayer({
  dealer,
  index,
  max,
  numbers,
  onChange,
  player,
  players,
  scoringRound
}: WizardScoringPlayerProps) {
  const round = player.rounds[scoringRound];
  return <React.Fragment>
    <GridItem
      alternate={index % 2 === 1}
      horizontalAlign={AlignItem.End}
      verticalAlign={AlignItem.Center}
    >
      <RowIndex index={index + 1}/>
    </GridItem>
    <GridItem
      alternate={index % 2 === 1}
    >
      <Column>
        <NormalText>
          {(dealer === player) && <TbCards/>}
          {getPlayerName(player, players.indexOf(player))}
        </NormalText>
        <SmallText>
          score: {numbers[index]} (<WizardScoringRoundScore bid={round.bid} taken={round.taken}/>)
        </SmallText>
      </Column>
    </GridItem>
    <GridItem
      verticalAlign={AlignItem.Center}
      horizontalAlign={AlignItem.Center}
      alternate={index % 2 === 1}
    >
      <NormalText>
        {round.bid}
      </NormalText>
    </GridItem>
    <GridItem
      verticalAlign={AlignItem.Center}
      alternate={index % 2 === 1}
    >
      <NumberField
        onChange={onChange}
        min={0}
        max={max}
        value={round.taken}
      />
    </GridItem>
  </React.Fragment>;
}

// endregion
