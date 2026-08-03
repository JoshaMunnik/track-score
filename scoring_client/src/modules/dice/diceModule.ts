// region imports

import {GameType} from "../../types/enums/GameType.ts";
import type {ModuleModel} from "../../types/models/ModuleModel.ts";
import mainImage from './assets/dice.jpg';
import {DiceRoute} from "./type/DiceRoute.ts";
import {DiceHomePage} from "./components/DiceHomePage.tsx";
import {DiceSettingsPage} from "./components/DiceSettingsPage.tsx";
import {useDiceStore} from "./store/useDiceStore.ts";
import {useDiceConfigurationsStore} from "./store/useDiceConfigurationsStore.ts";

// endregion

// region exports

export const diceModule: ModuleModel = {
  type: GameType.Dice,
  name: 'Dice',
  description: `
    Dice throws generator, with fair rolling support (see Information) to make sure all possible 
    combinations are thrown.
  `,
  mainImage: mainImage,
  routes: [
    {
      path: DiceRoute.Home,
      Component: DiceHomePage,
    },
    {
      path: DiceRoute.Settings,
      Component: DiceSettingsPage,
    }
  ],
  homePath: DiceRoute.Home,
  gameStore: useDiceStore,
  configurationsStore: useDiceConfigurationsStore,
};

// endregion