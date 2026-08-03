// region imports

import type {TeamConfigurationModel} from "../models/TeamConfigurationModel.ts";
import {
  createConfigurationsStore
} from "../../../store/configurations/createConfigurationsStore.ts";

// endregion

// region local

function createConfiguration(name: string): TeamConfigurationModel {
  return {
    name: name,
    teamCount: 2,
    playerCount: 2,
    maxScore: 0,
    scoreInterval: 1,
    trackDealer: false,
    useMaxScore: false,
    useScoreInterval: false,
  }
}

// endregion

// region exports

export const initialTeamConfigurations = [{
  name: '2 vs 2',
  teamCount: 2,
  playerCount: 2,
  useScoreInterval: false,
  scoreInterval: 1,
  maxScore: 0,
  useMaxScore: false,
  trackDealer: false
}, {
  name: 'Pinnacolo',
  teamCount: 2,
  playerCount: 2,
  useScoreInterval: true,
  scoreInterval: 5,
  maxScore: 2100,
  useMaxScore: true,
  trackDealer: true
}, {
  name: 'Canasta 2vs2',
  teamCount: 2,
  playerCount: 2,
  useScoreInterval: true,
  scoreInterval: 5,
  maxScore: 5000,
  useMaxScore: true,
  trackDealer: true
}, {
  name: 'Canasta 2vs2vs2',
  teamCount: 3,
  playerCount: 2,
  useScoreInterval: true,
  scoreInterval: 5,
  maxScore: 7500,
  useMaxScore: true,
  trackDealer: true
}, {
  name: 'Canasta 3vs3',
  teamCount: 2,
  playerCount: 3,
  useScoreInterval: true,
  scoreInterval: 5,
  maxScore: 10000,
  useMaxScore: true,
  trackDealer: true
}];

// noinspection DuplicatedCode
export const useTeamConfigurationsStore = createConfigurationsStore<TeamConfigurationModel>(
  'team-configurations',
  initialTeamConfigurations,
  createConfiguration
);

// endregion