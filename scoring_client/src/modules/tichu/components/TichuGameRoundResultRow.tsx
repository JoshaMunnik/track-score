// region imports

import {calcTichuScore} from "../tools/tichuTools.ts";
import type {TichuRoundModel} from "../models/TichuRoundModel.ts";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {DistributeContent} from "../../../types/enums/ui/DistributeContent.ts";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {Size} from "../../../types/enums/ui/Size.ts";
import {NormalText} from "../../../components/styled/text/NormalText.tsx";
import {Color} from "../../../types/enums/ui/Color.ts";
import {TichuGameRoundCallResult} from "./TichuGameRoundCallResult.tsx";
import {TichuGameRound} from "./TichuGameRound.tsx";

// endregion

// region local

type TichuGameRoundRowProps = Readonly<{
  round: TichuRoundModel;
  index: number;
  winners: boolean[];
}>;

// endregion

// region exports

export function TichuGameRoundResultRow({round, index, winners}: TichuGameRoundRowProps) {
  const team0score = calcTichuScore(round.teams[0], round.teams[1]);
  const team1score = calcTichuScore(round.teams[1], round.teams[0]);
  return (
    <>
      <TichuGameRound round={index} />
      <GridItem
        winner={winners[0]}
        borderBottom
      >
        <Row
          alignCrossAxis={AlignItem.Center}
          distributeMainAxis={DistributeContent.End}
          height={Size.Full}
        >
          <NormalText
            color={team0score < 0 ? Color.Danger : Color.Default}
          >
            {team0score}
          </NormalText>
        </Row>
      </GridItem>
      <GridItem
        borderRight
        borderBottom
        winner={winners[0]}
      >
        <TichuGameRoundCallResult team={round.teams[0]} />
      </GridItem>
      <GridItem
        borderBottom
        winner={winners[1]}
      >
        <Row
          alignCrossAxis={AlignItem.Center}
          distributeMainAxis={DistributeContent.End}
          height={Size.Full}
        >
          <NormalText
            color={team1score < 0 ? Color.Danger : Color.Default}
          >
            {team1score}
          </NormalText>
        </Row>
      </GridItem>
      <GridItem
        borderBottom
        winner={winners[1]}
      >
        <TichuGameRoundCallResult team={round.teams[1]} />
      </GridItem>
    </>
  );
}

// endregion
