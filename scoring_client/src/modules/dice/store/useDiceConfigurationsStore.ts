// region imports

import type {DiceConfigurationModel} from "../models/DiceConfigurationModel.ts";
import {
  createConfigurationsStore
} from "../../../store/configurations/createConfigurationsStore.ts";

// endregion

// region local

function createConfiguration(name: string): DiceConfigurationModel {
  return {
    name,
    diceCount: 1,
    startNumber: 1,
    endNumber: 6,
    useGroups: false,
    groupCount: 4,
    showTotal: false,
  };
}

// endregion

// region exports

export const initialDiceConfigurations: DiceConfigurationModel[] = [{
  name: '1 die (fair)',
  diceCount: 1,
  startNumber: 1,
  endNumber: 6,
  useGroups: true,
  groupCount: 4,
  showTotal: false,
}, {
  name: '1 die (random)',
  diceCount: 1,
  startNumber: 1,
  endNumber: 6,
  useGroups: false,
  groupCount: 4,
  showTotal: false,
}, {
  name: '2 dice (fair)',
  diceCount: 2,
  startNumber: 1,
  endNumber: 6,
  useGroups: true,
  groupCount: 4,
  showTotal: true,
}, {
  name: '2 dice (random)',
  diceCount: 2,
  startNumber: 1,
  endNumber: 6,
  useGroups: false,
  groupCount: 4,
  showTotal: true,
}, {
  name: '3 dice (fair)',
  diceCount: 3,
  startNumber: 1,
  endNumber: 6,
  useGroups: true,
  groupCount: 4,
  showTotal: true,
}, {
  name: '3 dice (random)',
  diceCount: 3,
  startNumber: 1,
  endNumber: 6,
  useGroups: false,
  groupCount: 4,
  showTotal: true,
}];

export const useDiceConfigurationsStore = createConfigurationsStore<DiceConfigurationModel>(
  'dice-configurations',
  initialDiceConfigurations,
  createConfiguration
);
