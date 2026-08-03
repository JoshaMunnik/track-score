// region imports

import {type TichuTeamRoundModel} from "../models/TichuTeamRoundModel.ts";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {TichuGameCallButtons} from "./TichuGameCallButtons.tsx";
import {TichuGameRound} from "./TichuGameRound.tsx";

// endregion

// region local

type TichuGameActiveRowProps = Readonly<{
  firstTeam: TichuTeamRoundModel;
  secondTeam: TichuTeamRoundModel;
  updateFirstTeam: (values: Partial<TichuTeamRoundModel>) => void;
  updateSecondTeam: (values: Partial<TichuTeamRoundModel>) => void;
  disabled: boolean;
  round: number;
}>;

// endregion

// region exports

export function TichuGameActiveRow({
  firstTeam, secondTeam, updateFirstTeam, updateSecondTeam, disabled, round
}: TichuGameActiveRowProps) {
  return (
    <>
      <TichuGameRound round={round} />
      <GridItem span={2} borderRight borderBottom>
        <TichuGameCallButtons team={firstTeam} update={updateFirstTeam} disabled={disabled}/>
      </GridItem>
      <GridItem span={2} borderBottom>
        <TichuGameCallButtons team={secondTeam} update={updateSecondTeam} disabled={disabled}/>
      </GridItem>
    </>
  );
}

// endregion
