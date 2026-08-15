// region imports

import {useShallow} from "zustand/react/shallow";
import {SwitchField} from "../../../components/styled/form/SwitchField.tsx";
import {NumberField} from "../../../components/styled/form/NumberField.tsx";
import {ConfirmPopup} from "../../../components/popup/ConfirmPopup.tsx";
import {useState} from "react";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import type {WizardConfig} from "../store/WizardConfig.ts";
import {useWizardStore} from "../store/useWizardStore.ts";
import {WizardRoute} from "../type/WizardRoute.ts";
import {Page} from "../../../components/page/Page.tsx";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {Grid} from "../../../components/styled/grid/Grid.tsx";
import {GridLabelItem} from "../../../components/styled/grid/GridLabelItem.tsx";
import {GridInputItem} from "../../../components/styled/grid/GridInputItem.tsx";

// endregion

// region exports

export function WizardSettingsPage() {
  const config: WizardConfig = useWizardStore(useShallow((state) => ({
    checkTotalBids: state.checkTotalBids,
    checkTotalBidsCount: state.checkTotalBidsCount,
  })));
  const {setConfig, active} = useWizardStore();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [pendingConfig, setPendingConfig] = useState<Partial<WizardConfig>>({});

  function updateConfig(newConfig: Partial<WizardConfig>) {
    if (active) {
      setPendingConfig(newConfig);
      setShowConfirm(true);
    } else {
      setConfig({...config, ...newConfig});
    }
  }

  function handleUpdateConfigConfirm(confirm: boolean): void {
    setShowConfirm(false);
    if (confirm) {
      setConfig({...config, ...pendingConfig});
    }
  }

  return (
    <>
      <Page title={"Wizard Settings"} backPath={WizardRoute.Home} type={PageType.Paper}>
        <Grid templateColumns="1fr auto" form>
          <GridLabelItem>
            Check bids total
          </GridLabelItem>
          <GridInputItem>
            <SwitchField
              value={config.checkTotalBids}
              onChange={(value) => updateConfig({checkTotalBids: value})}
            />
          </GridInputItem>
          <GridLabelItem hidden={!config.checkTotalBids}>
            Start check from card count
          </GridLabelItem>
          <GridInputItem hidden={!config.checkTotalBids}>
            <NumberField
              min={1}
              max={20}
              value={config.checkTotalBidsCount}
              onChange={(value) => updateConfig({checkTotalBidsCount: value})}
            />
          </GridInputItem>
        </Grid>
      </Page>
      <ConfirmPopup
        onClose={handleUpdateConfigConfirm}
        open={showConfirm}
        confirmType={ButtonType.Danger}
        confirmCaption={"Yes, apply settings"}
      >
        Changing the settings, will restart the game. Continue?
      </ConfirmPopup>
    </>
  );
}

// endregion