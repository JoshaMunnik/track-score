// region imports

import {create} from 'zustand';
import type {ConfigurationModel} from "../../types/models/ConfigurationModel.ts";
import type {ConfigurationsStore} from "./ConfigurationsStore.ts";
import {withDevtoolsAndPersist} from "../middleware/withDevtoolsAndPersist.ts";
import {isEqual} from "../../tools/mainTools.ts";

// endregion

// region local

function getName(configurations: ConfigurationModel[]): string {
  for (let index = 1; ; index++) {
    const name = 'config ' + index;
    if (!configurations.find(configuration => configuration.name === name)) {
      return name;
    }
  }
}

// endregion

// region exports

/**
 * This function can be used to create a store to manage configurations. It expects a type that
 * extends {@link ConfigurationModel}. The created store is persisted in the local storage.
 *
 * The `name` is used both the dev tools and persistent storage.
 */
export function createConfigurationsStore<T extends ConfigurationModel>(
  name: string,
  initialConfigurations: T[],
  configurationFactory: (name: string) => T,
) {
  return create(withDevtoolsAndPersist<ConfigurationsStore<T>>(
    name,
    (set, get) => ({
      configurations: initialConfigurations,
      selected: 0,

      updateName: (name: string) => set((state) => {
        if (state.selected < 0) {
          return {};
        }
        const configurations = [...state.configurations];
        const configuration = configurations[state.selected];
        configurations[state.selected] = {
          ...configuration,
          name: name
        };
        return {
          configurations,
        };
      }),

      update: (configuration) => set((state) => {
        const configurations = [...state.configurations];
        let index = state.selected;
        if (index < 0) {
          configurations.push({
            ...configuration,
            name: getName(configurations)
          });
          index = configurations.length - 1;
        } else {
          configurations[index] = {
            ...configuration,
            name: configurations[index].name
          };
        }
        return {
          configurations,
          selected: index,
        };
      }),

      add: () => set((state) => {
        const configuration = configurationFactory(getName(state.configurations));
        return {
          configurations: [...state.configurations, configuration],
          // no -1, since this is the length of old array; so it will point to the added entry
          selected: state.configurations.length,
        };
      }),

      delete: () => set((state) => {
        if (state.selected < 0) {
          return {};
        }
        // make sure there is always one config; just reset the config if there is
        // only one
        if (state.configurations.length === 1) {
          return {
            configurations: [configurationFactory(getName(state.configurations))],
            // should already be 0, just to be sure
            selected: 0,
          };
        }
        const configurations = [...state.configurations];
        configurations.splice(state.selected, 1);
        return {
          configurations,
          selected: Math.min(state.selected, configurations.length - 1),
        };
      }),

      select: (index: number) => set({
        selected: index,
      }),

      selectForConfiguration: (configuration) => set((state) => {
        const configurations = state.configurations;
        // first try to find a config that also matches the name
        for(let index = 0; index < configurations.length; index++) {
          if (isEqual(configurations[index], configuration)) {
            return {
              selected: index
            };
          }
        }
        // else try to find a config that matches all fields, except the name
        for (let index = 0; index < configurations.length; index++) {
          if (isEqual(configurations[index], configuration, ['name'])) {
            return {
              selected: index
            };
          }
        }
        // no matching config found
        return {
          selected: -1
        };
      }),

      reset: () => set({
        configurations: initialConfigurations,
        selected: 0,
      }),

      getConfiguration: (): T => {
        const state = get();
        if (state.selected < 0) {
          throw new Error("No config selected");
        }
        return state.configurations[state.selected];
      },
    })
  ));
}

// endregion

