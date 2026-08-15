// region imports

import {GameType} from "../../types/enums/GameType.ts";
import type {ModuleModel} from "../../types/models/ModuleModel.ts";
import mainImage from './assets/team.jpg';
import {TeamRoute} from "./type/TeamRoute.ts";
import {TeamHomePage} from "./components/TeamHomePage.tsx";
import {TeamSettingsPage} from "./components/TeamSettingsPage.tsx";
import {useTeamStore} from "./store/useTeamStore.ts";
import {TeamPlayersPage} from "./components/TeamPlayersPage.tsx";
import {TeamScoringPage} from "./components/TeamScoringPage.tsx";
import {useTeamConfigurationsStore} from "./store/useTeamConfigurationsStore.ts";

// endregion

// region exports

export const teamModule: ModuleModel = {
  type: GameType.Team,
  name: 'Team',
  description: `
    General scoring for games played by teams where the team score is based on the sum of the 
    scores of all players in that team.
  `,
  mainImage: mainImage,
  routes: [
    {
      path: TeamRoute.Home,
      Component: TeamHomePage,
    },
    {
      path: TeamRoute.Players,
      Component: TeamPlayersPage,
    },
    {
      path: TeamRoute.Settings,
      Component: TeamSettingsPage,
    },
    {
      path: TeamRoute.Scoring,
      Component: TeamScoringPage,
    }
  ],
  homePath: TeamRoute.Home,
  gameStore: useTeamStore,
  configurationsStore: useTeamConfigurationsStore,
};

// endregion