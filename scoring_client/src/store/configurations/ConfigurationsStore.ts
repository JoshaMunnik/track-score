// region imports

import type {ConfigurationModel} from "../../types/models/ConfigurationModel.ts";
import type {ResettableActions} from "../resettable/ResettableActions.ts";

// endregion

// region exports

export type ConfigurationsState<T extends ConfigurationModel> = Readonly<{
  /**
   * A list of configurations.
   */
  configurations: T[];

  /**
   * Index of current selected config.
   */
  selected: number;
}>;

export type ConfigurationsActions<T extends ConfigurationModel> = ResettableActions & Readonly<{
  /**
   * Select a certain config.
   */
  select(index: number): void;

  /**
   * Tries to find a stored config matching the given config. The name of the
   * config is ignored.
   *
   * If no config can be found, {@link index} is set to -1
   *
   * @param configuration
   *   Configuration to match
   */
  selectForConfiguration(configuration: T): void;

  /**
   * Adds a new config to the store and select it.
   */
  add(): void;

  /**
   * Deletes the current selected config. If {@link index} is -1, this action will
   * do nothing.
   */
  delete(): void;

  /**
   * Updates the name of the selected config.
   */
  updateName(name: string): void;

  /**
   * Updates the selected config. If {@link index} is -1, a new config
   * is added and selected. The {@link ConfigurationModel.name} field is ignored.
   */
  update(configuration: T): void;

  /**
   * Gets the selected config. If {@link index} is -1, this action will throw an error
   */
  getConfiguration(): T;
}>;

export type ConfigurationsStore<T extends ConfigurationModel> =
  ConfigurationsState<T>
  & ConfigurationsActions<T>;

// endregion