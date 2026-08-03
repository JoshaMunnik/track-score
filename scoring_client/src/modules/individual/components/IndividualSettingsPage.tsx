// region imports

import {Page} from "../../../components/page/Page.tsx";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {ConfigurationForm} from "../../../components/form/ConfigurationForm/ConfigurationForm.tsx";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {useIndividualStore} from "../store/useIndividualStore.ts";
import {IndividualRoute} from "../type/IndividualRoute.ts";
import {IndividualConfigurationForm} from "./IndividualConfigurationForm.tsx";
import {useIndividualConfigurationsStore} from "../store/useIndividualConfigrationsStore.ts";

// endregion

// region exports

export function IndividualSettingsPage() {
  return (
    <Page title="Individual Settings" backPath={IndividualRoute.Home} type={PageType.Padding}>
      <Column width={Size.Full} gap={Spacing.Normal}>
        <ConfigurationForm
          gameStore={useIndividualStore}
          configurationsStore={useIndividualConfigurationsStore}
        />
        <IndividualConfigurationForm />
      </Column>
    </Page>
  );
}

// endregion