// region imports

import {type StateCreator} from 'zustand';
import type {ConfigurationModel} from "../../types/models/ConfigurationModel.ts";
import type {GameState} from "../game/GameStore.ts";
import type {ConfigurationStore} from "../configuration/ConfigurationStore.ts";

// endregion

// region exports

/**
 * This function can be used to add support for configurations to a game store. It expects a type
 * that extends {@link ConfigurationModel}.
 *
 * The store still needs to define a property 'config' of the specified type and set
 * initial values.
 *
 * When using the function, you need to specify both the {@link ConfigurationModel} type and the
 * final store type that extends {@link ConfigurationStore}.
 *
 * When updating a config, the selected config at the attached configurations store
 * will also get updated.
 */
export function withConfiguration<TModel extends ConfigurationModel, TStore extends (GameState & ConfigurationStore<TModel>)>(
  config: StateCreator<TStore, [], [], Omit<TStore, keyof ConfigurationStore<TModel>>>
): StateCreator<TStore, [], [], TStore> {
  return (set, get, api) => {
    // implement the store methods
    const baseState: Omit<ConfigurationStore<TModel>, 'configuration'> = {
      updateConfiguration: (configuration, restart, configurationsStore) => set((state) => {
        const newConfiguration = {
          ...state.configuration,
          ...configuration
        };
        if (configurationsStore) {
          configurationsStore.getState().update(newConfiguration);
        }
        return {
          configuration: newConfiguration,
          active: restart ? false : state.active,
        } as Partial<TStore>;
      }),
    };

    return {
      ...(baseState as unknown as TStore),
      ...config(set, get, api),
    };
  };
}

// endregion