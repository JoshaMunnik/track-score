// region imports

import type {ConfigurationModel} from "../types/models/ConfigurationModel.ts";

// endregion

// region exports

export function createConfigurationName(configurations: ConfigurationModel[]): string {
  for (let index = 1; ; index++) {
    const name = 'config ' + index;
    if (!configurations.find(configuration => configuration.name === name)) {
      return name;
    }
  }
}

// endregion