// region imports

import {DiceCatanRoute} from "../type/DiceCatanRoute.ts";
import {GridLabelItem} from "../../../components/styled/grid/GridLabelItem.tsx";
import {GridInputItem} from "../../../components/styled/grid/GridInputItem.tsx";
import {useDiceCatanStore} from "../store/useDiceCatanStore.ts";
import {useShallow} from "zustand/react/shallow";
import type {DiceCatanConfig} from "../store/DiceCatanConfig.ts";
import {NumberField} from "../../../components/styled/form/NumberField.tsx";
import {ConfirmPopup} from "../../../components/popup/ConfirmPopup.tsx";
import {useState} from "react";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import {Page} from "../../../components/page/Page.tsx";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {SwitchField} from "../../../components/styled/form/SwitchField.tsx";

// endregion

// region exports

export function DiceCatanSettingsPage() {
  const config: DiceCatanConfig = useDiceCatanStore(useShallow((state) => ({
    useGroups: state.useGroups,
    groupCount: state.groupCount,
    trackBarbarians: state.trackBarbarians,
    barbarianShipMoves: state.barbarianShipMoves,
    ignoreSevens: state.ignoreSevens
  })));
  const {setConfig, active} = useDiceCatanStore();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [pendingConfig, setPendingConfig] = useState<Partial<DiceCatanConfig>>({});

  function updateConfig(newConfig: Partial<DiceCatanConfig>) {
    if (active) {
      setPendingConfig(newConfig);
      setShowConfirm(true);
    }
    else {
      setConfig({...config, ...newConfig});
    }
  }

  return (
    <>
      <Page title={"Dice Catan Settings"} backPath={DiceCatanRoute.Home} type={PageType.Paper}>
        <Grid templateColumns="1fr auto" form>
          <GridLabelItem>
            Fair rolls
          </GridLabelItem>
          <GridInputItem>
            <SwitchField
              value={config.useGroups}
              onChange={(value) => updateConfig({useGroups: value})}
            />
          </GridInputItem>
          <GridLabelItem hidden={!config.useGroups}>
            Dice group count
          </GridLabelItem>
          <GridInputItem hidden={!config.useGroups}>
            <NumberField
              min={1}
              max={99}
              value={config.groupCount}
              onChange={(value) => updateConfig({groupCount: value})}
            />
          </GridInputItem>
          <GridLabelItem>
            Track barbarians
          </GridLabelItem>
          <GridInputItem>
            <SwitchField
              value={config.trackBarbarians}
              onChange={(value) => updateConfig({trackBarbarians: value})}
            />
          </GridInputItem>
          <GridLabelItem hidden={!config.trackBarbarians}>
            Number of barbarian ship moves
          </GridLabelItem>
          <GridInputItem hidden={!config.trackBarbarians}>
            <NumberField
              min={1}
              max={99}
              value={config.barbarianShipMoves}
              onChange={(value) => updateConfig({barbarianShipMoves: value})}
            />
          </GridInputItem>
          <GridLabelItem hidden={!config.trackBarbarians}>
            Ignore sevens until the the barbarians have invaded
          </GridLabelItem>
          <GridInputItem hidden={!config.trackBarbarians}>
            <SwitchField
              value={config.ignoreSevens}
              onChange={(value) => updateConfig({ignoreSevens: value})}
            />
          </GridInputItem>
        </Grid>
      </Page>
      <ConfirmPopup
        onClose={(confirm) => {
          setShowConfirm(false);
          if (confirm) {
            setConfig({...config, ...pendingConfig});
          }
        }}
        open={showConfirm}
        confirmType={ButtonType.Danger}
        confirmCaption={"Yes, apply settings"}
      >
        Changing the settings, will restart the dice rolls. Continue?
      </ConfirmPopup>
    </>
  );
}

// endregion