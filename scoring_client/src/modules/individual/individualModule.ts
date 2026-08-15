// region imports

import {GameType} from "../../types/enums/GameType.ts";
import type {ModuleModel} from "../../types/models/ModuleModel.ts";
import mainImage from './assets/individual.jpg';
import {IndividualRoute} from "./type/IndividualRoute.ts";
import {IndividualHomePage} from "./components/IndividualHomePage.tsx";
import {IndividualSettingsPage} from "./components/IndividualSettingsPage.tsx";
import {useIndividualStore} from "./store/useIndividualStore.ts";
import {IndividualPlayersPage} from "./components/IndividualPlayersPage.tsx";
import {IndividualScoringPage} from "./components/IndividualScoringPage.tsx";
import {useIndividualConfigurationsStore} from "./store/useIndividualConfigrationsStore.ts";

// endregion

// region exports

export const individualModule: ModuleModel = {
  type: GameType.Individual,
  name: 'Individual',
  description: `
    General scoring for games that uses a single score per player or team playing against other 
    players or teams.
  `,
  mainImage: mainImage,
  routes: [
    {
      path: IndividualRoute.Home,
      Component: IndividualHomePage,
    },
    {
      path: IndividualRoute.Players,
      Component: IndividualPlayersPage,
    },
    {
      path: IndividualRoute.Settings,
      Component: IndividualSettingsPage,
    },
    {
      path: IndividualRoute.Scoring,
      Component: IndividualScoringPage,
    }
  ],
  homePath: IndividualRoute.Home,
  gameStore: useIndividualStore,
  configurationsStore: useIndividualConfigurationsStore,
};

// endregion