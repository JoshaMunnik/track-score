// region imports

import {useDiceStore} from "../store/useDiceStore.ts";
import {useShallow} from "zustand/react/shallow";
import {SwitchField} from "../../../components/styled/form/SwitchField.tsx";
import {NumberField} from "../../../components/styled/form/NumberField.tsx";
import {ConfirmPopup} from "../../../components/popup/ConfirmPopup.tsx";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import type {DiceConfigurationModel} from "../models/DiceConfigurationModel.ts";
import {useState} from "react";
import { Paper } from "../../../components/page/Paper.tsx";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {GridInputItem} from "../../../components/styled/grid/GridInputItem.tsx";
import {GridLabelItem} from "../../../components/styled/grid/GridLabelItem.tsx";
import {useDiceConfigurationsStore} from "../store/useDiceConfigurationsStore.ts";

// endregion

// region exports

export function DiceConfigurationForm() {
  const {
    configuration,
    updateConfiguration,
    active
  } = useDiceStore(useShallow((state) => ({
    active: state.active,
    configuration: state.configuration,
    updateConfiguration: state.updateConfiguration,
  })));
  const [showConfirm, setShowConfirm] = useState(false);
  const [newConfiguration, setNewConfiguration] = useState<Partial<DiceConfigurationModel>>({});

  function updateAndCheck(value: Partial<DiceConfigurationModel>): void {
    if (active) {
      setNewConfiguration(value);
      setShowConfirm(true);
    } else {
      update(value, true);
    }
  }

  function update(value: Partial<DiceConfigurationModel>, restart: boolean) {
    updateConfiguration(value, restart, useDiceConfigurationsStore);
  }

  return (
    <>
      <Paper>
        <Grid templateColumns="1fr auto" form>
          <GridLabelItem>
            Dice count
          </GridLabelItem>
          <GridInputItem>
            <NumberField
              value={configuration.diceCount}
              min={1}
              max={100}
              onChange={(value) => updateAndCheck({diceCount: value})}
            />
          </GridInputItem>
          <GridLabelItem hidden={configuration.diceCount === 1}>
            Show dice with total
          </GridLabelItem>
          <GridInputItem  hidden={configuration.diceCount === 1}>
            <SwitchField
              value={configuration.showTotal}
              onChange={(value) => update({showTotal: value}, false)}
            />
          </GridInputItem>
          <GridLabelItem>
            Start number
          </GridLabelItem>
          <GridInputItem>
            <NumberField
              value={configuration.startNumber}
              min={1}
              max={100}
              onChange={(value) => updateAndCheck({startNumber: value})}
            />
          </GridInputItem>
          <GridLabelItem>
            End number
          </GridLabelItem>
          <GridInputItem>
            <NumberField
              value={configuration.endNumber}
              min={1}
              max={100}
              onChange={(value) => updateAndCheck({endNumber: value})}
            />
          </GridInputItem>
          <GridLabelItem>
            Fair rolls
          </GridLabelItem>
          <GridInputItem>
            <SwitchField
              value={configuration.useGroups}
              onChange={(value) => updateAndCheck({useGroups: value})}
            />
          </GridInputItem>
          <GridLabelItem hidden={!configuration.useGroups}>
            Dice group count
          </GridLabelItem>
          <GridInputItem hidden={!configuration.useGroups}>
            <NumberField
              min={1}
              max={99}
              value={configuration.groupCount}
              onChange={(value) => updateAndCheck({groupCount: value})}
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
        Changing the setting, will restart the dice rolls. Continue?
      </ConfirmPopup>
    </>
  );
}

// endregion