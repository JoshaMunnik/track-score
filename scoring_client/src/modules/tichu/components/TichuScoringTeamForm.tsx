// region imports

import {SwitchField} from "../../../components/styled/form/SwitchField.tsx";
import {NumberField} from "../../../components/styled/form/NumberField.tsx";
import {TichuResultType} from "../type/TichuResultType.ts";
import {calcTichuScore} from "../tools/tichuTools.ts";
import {GridLabelItem} from "../../../components/styled/grid/GridLabelItem.tsx";
import {GridInputItem} from "../../../components/styled/grid/GridInputItem.tsx";
import {GridItem} from "../../../components/styled/grid/GridItem.tsx";
import {LargeText} from "../../../components/styled/text/LargeText.tsx";
import type {TichuTeamRoundModel} from "../models/TichuTeamRoundModel.ts";

// endregion

// region local

type TichuScoringTeamFormProps = Readonly<{
  names: string;
  team: TichuTeamRoundModel;
  otherTeam: TichuTeamRoundModel;
  borderTop: boolean;
  update: (values: Partial<TichuTeamRoundModel>) => void;
}>;

// endregion

// region exports

export function TichuScoringTeamForm({
  names,
  team,
  otherTeam,
  borderTop,
  update
}: TichuScoringTeamFormProps) {
  return (
    <>
      <GridItem span={3} borderTop={borderTop}>
        <LargeText><em>{names}</em></LargeText>
      </GridItem>
      <GridLabelItem>
        Finished as first two
      </GridLabelItem>
      <GridInputItem>
        <SwitchField
          value={team.first}
          onChange={(value) => update({first: value})}
        />
      </GridInputItem>
      <GridInputItem>
        {team.first ? '200' : '0'}
      </GridInputItem>
      <GridLabelItem hidden={team.first || otherTeam.first}>
        Card score
      </GridLabelItem>
      <GridInputItem hidden={team.first || otherTeam.first}>
        <NumberField
          step={5}
          min={-25}
          max={125}
          value={team.cardScore}
          onChange={(value) => update({cardScore: value})}
        />
      </GridInputItem>
      <GridInputItem hidden={team.first || otherTeam.first}>
        {team.cardScore}
      </GridInputItem>
      <GridLabelItem hidden={!team.grandTichu}>
        Grand Tichu
      </GridLabelItem>
      <GridInputItem hidden={!team.grandTichu}>
        {
          !otherTeam.first &&
          <SwitchField
            value={team.result === TichuResultType.GrandTichu}
            onChange={(value) => update({result: value ? TichuResultType.GrandTichu : TichuResultType.None})}
          />
        }
      </GridInputItem>
      <GridInputItem hidden={!team.grandTichu}>
        {team.result === TichuResultType.GrandTichu ? '200' : '-200'}
      </GridInputItem>
      <GridLabelItem hidden={!team.tichu0}>
        Tichu
      </GridLabelItem>
      <GridInputItem hidden={!team.tichu0}>
        {
          !otherTeam.first &&
          <SwitchField
            value={team.result === TichuResultType.Tichu}
            onChange={(value) => update({result: value ? TichuResultType.Tichu : TichuResultType.None})}
          />
        }
      </GridInputItem>
      <GridInputItem hidden={!team.tichu0}>
        {team.result === TichuResultType.Tichu ? '100' : '-100'}
      </GridInputItem>
      <GridLabelItem hidden={!team.tichu1}>
        Second Tichu
      </GridLabelItem>
      <GridLabelItem hidden={!team.tichu1}>
      </GridLabelItem>
      <GridInputItem hidden={!team.tichu1}>
        -100
      </GridInputItem>
      <GridLabelItem>
        <strong>Total score</strong>
      </GridLabelItem>
      <GridLabelItem>
      </GridLabelItem>
      <GridInputItem>
        <strong>{calcTichuScore(team, otherTeam)}</strong>
      </GridInputItem>
    </>
  );
}

// endregion