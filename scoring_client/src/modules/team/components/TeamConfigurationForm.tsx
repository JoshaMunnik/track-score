// region imports

import {useShallow} from "zustand/react/shallow";
import {SwitchField} from "../../../components/styled/form/SwitchField.tsx";
import {NumberField} from "../../../components/styled/form/NumberField.tsx";
import {ConfirmPopup} from "../../../components/popup/ConfirmPopup.tsx";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import {useState} from "react";
import {Paper} from "../../../components/page/Paper.tsx";
import {useTeamStore} from "../store/useTeamStore.ts";
import type {TeamConfigurationModel} from "../models/TeamConfigurationModel.ts";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {GridLabelItem} from "../../../components/styled/grid/GridLabelItem.tsx";
import {GridInputItem} from "../../../components/styled/grid/GridInputItem.tsx";
import {useTeamConfigurationsStore} from "../store/useTeamConfigurationsStore.ts";

// endregion

// region exports

export function TeamConfigurationForm() {
  const {
    configuration,
    updateConfiguration,
    active,
  } = useTeamStore(useShallow((state) => ({
    active: state.active,
    configuration: state.configuration,
    updateConfiguration: state.updateConfiguration,
  })));
  const [showConfirm, setShowConfirm] = useState(false);
  const [newConfiguration, setNewConfiguration] = useState<Partial<TeamConfigurationModel>>({});

  function checkAndUpdate(value: Partial<TeamConfigurationModel>): void {
    if (active) {
      setNewConfiguration(value);
      setShowConfirm(true);
    } else {
      update(value, true);
    }
  }

  function update(value: Partial<TeamConfigurationModel>, restart: boolean) {
    updateConfiguration(value, restart, useTeamConfigurationsStore);
  }

  return (
    <>
      <Paper>
        <Grid templateColumns="1fr auto" form>
          <GridLabelItem>
            Has maximum scoring
          </GridLabelItem>
          <GridInputItem>
            <SwitchField
              value={configuration.useMaxScore}
              onChange={(value) => update({useMaxScore: value}, false)}
            />
          </GridInputItem>
          <GridLabelItem hidden={!configuration.useMaxScore}>
            Max score
          </GridLabelItem>
          <GridInputItem hidden={!configuration.useMaxScore}>
            <NumberField
              value={configuration.maxScore}
              min={1}
              max={100}
              onChange={(value) => update({maxScore: value}, false)}
            />
          </GridInputItem>
          <GridLabelItem>
            Use scoring interval
          </GridLabelItem>
          <GridInputItem>
            <SwitchField
              value={configuration.useScoreInterval}
              onChange={(value) => update({useScoreInterval: value}, false)}
            />
          </GridInputItem>
          <GridLabelItem hidden={!configuration.useScoreInterval}>
            Scoring interval
          </GridLabelItem>
          <GridInputItem hidden={!configuration.useScoreInterval}>
            <NumberField
              value={configuration.scoreInterval}
              min={1}
              max={100}
              onChange={(value) => update({scoreInterval: value}, false)}
            />
          </GridInputItem>
          <GridLabelItem>
            Number of teams
          </GridLabelItem>
          <GridInputItem>
            <NumberField
              value={configuration.teamCount}
              min={1}
              max={6}
              onChange={(value) => checkAndUpdate({teamCount: value})}
            />
          </GridInputItem>
          <GridLabelItem>
            Players per team
          </GridLabelItem>
          <GridInputItem>
            <NumberField
              value={configuration.playerCount}
              min={2}
              max={16}
              onChange={(value) => checkAndUpdate({playerCount: value})}
            />
          </GridInputItem>
          <GridLabelItem>
            Track dealer
          </GridLabelItem>
          <GridInputItem>
            <SwitchField
              value={configuration.trackDealer}
              onChange={(value) => checkAndUpdate({trackDealer: value})}
            />
          </GridInputItem>
        </Grid>
      </Paper>
      <ConfirmPopup
        onClose={(confirm) => {
          setShowConfirm(false);
          if (confirm) {
            update(newConfiguration, true);
          }
        }}
        open={showConfirm}
        confirmType={ButtonType.Danger}
        confirmCaption={"Yes, apply change"}
      >
        Changing the setting, will restart the game. Continue?
      </ConfirmPopup>
    </>
  );
}

// endregion