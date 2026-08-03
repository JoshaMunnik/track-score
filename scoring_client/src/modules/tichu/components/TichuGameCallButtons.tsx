// region imports

import {updateGameSession} from "../../../tools/mainTools.ts";
import {useTichuStore} from "../store/useTichuStore.ts";
import {useTichuSharableStore} from "../store/useTichuSharableStore.ts";
import {Row} from "../../../components/styled/layout/Row.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {DistributeContent} from "../../../types/enums/ui/DistributeContent.ts";
import {ToggleButton} from "../../../components/styled/form/ToggleButton.tsx";
import type {TichuTeamRoundModel} from "../models/TichuTeamRoundModel.ts";

// endregion

// region local

type TichuGameCallButtonsProps = Readonly<{
  team: TichuTeamRoundModel;
  update: (values: Partial<TichuTeamRoundModel>) => void;
  disabled?: boolean;
}>;

// endregion

// region exports

export function TichuGameCallButtons({ team, update, disabled }: TichuGameCallButtonsProps) {

  function updateTeam(values: Partial<TichuTeamRoundModel>) {
    // call should not happen when viewing, but just to be sure
    if (disabled) {
      return;
    }
    update(values);
    updateGameSession(useTichuStore, useTichuSharableStore);
  }

  return (
    <Row gap={Spacing.Tiny} distributeMainAxis={DistributeContent.Center}>
      <ToggleButton
        value={team.grandTichu}
        onChange={(value) => updateTeam({grandTichu: value})}
        disabled={team.tichu0 && team.tichu1}
        readonly={disabled}
      >
        G
      </ToggleButton>
      <ToggleButton
        value={team.tichu0}
        onChange={(value) => updateTeam({tichu0: value})}
        disabled={team.grandTichu && team.tichu1}
        readonly={disabled}
      >
        T
      </ToggleButton>
      <ToggleButton
        value={team.tichu1}
        onChange={(value) => updateTeam({tichu1: value})}
        disabled={(team.grandTichu && team.tichu0) || !team.tichu0}
        readonly={disabled}
      >
        T
      </ToggleButton>
    </Row>
  );
}

// endregion
