// region import

import {
  createConfigurationsStore
} from "../../../store/configurations/createConfigurationsStore.ts";
import type {IndividualConfigurationModel} from "../models/IndividualConfigurationModel.ts";

// endregion

// region local

function createConfiguration(name: string): IndividualConfigurationModel {
  return {
    name: name,
    maxPlayerCount: 99,
    minPlayerCount: 1,
    maxScore: 0,
    scoreInterval: 1,
    trackDealer: false,
    useMaxScore: false,
    useScoreInterval: false,
  }
}

// endregion

// region exports

export const initialIndividualConfigurations: IndividualConfigurationModel[] = [
  {
    name: 'default',
    minPlayerCount: 2,
    maxPlayerCount: 99,
    useScoreInterval: false,
    scoreInterval: 1,
    maxScore: 0,
    useMaxScore: false,
    trackDealer: false
  }, {
    name: 'Pinnacolo',
    minPlayerCount: 2,
    maxPlayerCount: 3,
    useScoreInterval: true,
    scoreInterval: 5,
    maxScore: 1500,
    useMaxScore: true,
    trackDealer: true
  }, {
    name: 'Canasta',
    minPlayerCount: 2,
    maxPlayerCount: 3,
    useScoreInterval: true,
    scoreInterval: 5,
    maxScore: 5000,
    useMaxScore: true,
    trackDealer: true
  }
];

export const useIndividualConfigurationsStore = createConfigurationsStore<IndividualConfigurationModel>(
  'individual-configurations',
  initialIndividualConfigurations,
  createConfiguration
);

// endregion
