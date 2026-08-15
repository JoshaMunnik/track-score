// region imports

import type {TichuTeamRoundModel} from "../models/TichuTeamRoundModel.ts";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {TichuCallResult} from "./TichuCallResult.tsx";
import {TichuResultType} from "../type/TichuResultType.ts";

// endregion

// region local

type TichuGameRoundCallResultProps = Readonly<{
  team: TichuTeamRoundModel;
}>;

// endregion

// region exports

export function TichuGameRoundCallResult({ team }: TichuGameRoundCallResultProps) {
  return (
    <Row gap={Spacing.Tiny}>
      {
        team.first && <TichuCallResult correct={true}>12</TichuCallResult>
      }
      {
        team.grandTichu &&
        <TichuCallResult correct={team.result === TichuResultType.GrandTichu}>G</TichuCallResult>
      }
      {
        team.tichu0 &&
        <TichuCallResult correct={team.result === TichuResultType.Tichu}>T</TichuCallResult>
      }
      {
        team.tichu1 &&
        <TichuCallResult correct={(team.result === TichuResultType.Tichu) && !team.tichu0}>
          T
        </TichuCallResult>
      }
    </Row>
  )
}

// endregion