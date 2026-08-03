// region imports

import {Page} from "../../../components/page/Page.tsx";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {ConfigurationForm} from "../../../components/form/ConfigurationForm/ConfigurationForm.tsx";
import {useDiceStore} from "../store/useDiceStore.ts";
import {DiceConfigurationForm} from "./DiceConfigurationForm.tsx";
import {DiceRoute} from "../type/DiceRoute.ts";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {useDiceConfigurationsStore} from "../store/useDiceConfigurationsStore.ts";

// endregion

// region exports

export function DiceSettingsPage() {
  return (
    <Page title="Dice Settings" backPath={DiceRoute.Home} type={PageType.Padding}>
      <Column width={Size.Full} gap={Spacing.Normal}>
        <ConfigurationForm
          configurationsStore={useDiceConfigurationsStore}
          gameStore={useDiceStore}
        />
        <DiceConfigurationForm/>
      </Column>
    </Page>
  );
}

// endregion