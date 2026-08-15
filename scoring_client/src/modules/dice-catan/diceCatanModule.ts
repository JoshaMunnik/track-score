// region imports

import {GameType} from "../../types/enums/GameType.ts";
import type {ModuleModel} from "../../types/models/ModuleModel.ts";
import {DiceCatanRoute} from "./type/DiceCatanRoute.ts";
import {DiceCatanHomePage} from "./components/DiceCatanHomePage.tsx";
import {DiceCatanSettingsPage} from "./components/DiceCatanSettingsPage.tsx";
import mainImage from './assets/dice-catan.jpg';
import {useDiceCatanStore} from "./store/useDiceCatanStore.ts";

// endregion

// region exports

export const diceCatanModule: ModuleModel = {
  type: GameType.DiceCatan,
  name: 'Dice for Catan Cities & Knights',
  description: `
    Dice throws generator, with fair rolling support (see Information) to make sure all possible
    combinations are thrown. It also contains the special die and a barbarians ship tracker.
  `,
  mainImage: mainImage,
  routes: [
    {
      path: DiceCatanRoute.Home,
      Component: DiceCatanHomePage,
    },
    {
      path: DiceCatanRoute.Settings,
      Component: DiceCatanSettingsPage,
    }
  ],
  homePath: DiceCatanRoute.Home,
  gameStore: useDiceCatanStore,
};

// endregion