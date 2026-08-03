// region imports

import {GameType} from "../../types/enums/GameType.ts";
import type {ModuleModel} from "../../types/models/ModuleModel.ts";
import mainImage from './assets/tichu.jpg';
import {TichuRoute} from "./type/TichuRoute.ts";
import {TichuHomePage} from "./components/TichuHomePage.tsx";
import {useTichuStore} from "./store/useTichuStore.ts";
import {TichuPlayersPage} from "./components/TichuPlayersPage.tsx";
import {TichuScoringPage} from "./components/TichuScoringPage.tsx";

// endregion

// region exports

export const tichuModule: ModuleModel = {
  type: GameType.Tichu,
  name: 'Tichu',
  description: `
    Scoring for Tichu game.
  `,
  mainImage: mainImage,
  routes: [
    {
      path: TichuRoute.Home,
      Component: TichuHomePage,
    },
    {
      path: TichuRoute.Players,
      Component: TichuPlayersPage,
    },
    {
      path: TichuRoute.Scoring,
      Component: TichuScoringPage,
    }
  ],
  homePath: TichuRoute.Home,
  gameStore: useTichuStore,
};

// endregion