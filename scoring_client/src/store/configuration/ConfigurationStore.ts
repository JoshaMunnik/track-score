// region imports

import type {ConfigurationModel} from "../../types/models/ConfigurationModel.ts";
import type {ZustandStore} from "../../types/store/ZustandStore.ts";
import type {ConfigurationsActions} from "../configurations/ConfigurationsStore.ts";

// endregion

// region exports

export type ConfigurationState<T extends ConfigurationModel> = Readonly<{
  /**
   * The currently selected config.
   */
  configuration: T;
}>;

export type ConfigurationActions<T extends ConfigurationModel> = Readonly<{
  /**
   * Updates (a part of) the selected configuration.
   *
   * @param configuration
   *   New config data
   * @param restart
   *   When true, restart game (setting active to `false`)
   * @param configurationsStore
   *   When provided, also updates the selected configuration in the configurations store
   */
  updateConfiguration(
    configuration: Partial<T>,
    restart: boolean,
    configurationsStore?: ZustandStore<ConfigurationsActions<T>>
  ): void;
}>;

export type ConfigurationStore<T extends ConfigurationModel> =
  ConfigurationState<T>
  & ConfigurationActions<T>;

// endregion