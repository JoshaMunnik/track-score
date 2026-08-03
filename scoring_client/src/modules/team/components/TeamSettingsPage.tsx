// region imports

import {Page} from "../../../components/page/Page.tsx";
import {PageType} from "../../../types/enums/ui/PageType.ts";
import {ConfigurationForm} from "../../../components/form/ConfigurationForm/ConfigurationForm.tsx";
import {Size} from "../../../types/enums/ui/Size.ts";
import {Column} from "../../../components/styled/layout/Column.tsx";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {useTeamStore} from "../store/useTeamStore.ts";
import {TeamRoute} from "../type/TeamRoute.ts";
import {TeamConfigurationForm} from "./TeamConfigurationForm.tsx";
import {useTeamConfigurationsStore} from "../store/useTeamConfigurationsStore.ts";

// endregion

// region exports

export function TeamSettingsPage() {
  return (
    <Page title="Team Settings" backPath={TeamRoute.Home} type={PageType.Padding}>
      <Column width={Size.Full} gap={Spacing.Normal}>
        <ConfigurationForm
          configurationsStore={useTeamConfigurationsStore}
          gameStore={useTeamStore}
        />
        <TeamConfigurationForm />
      </Column>
    </Page>
  );
}

// endregion