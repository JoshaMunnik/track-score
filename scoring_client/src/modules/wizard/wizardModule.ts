import type {ModuleModel} from "../../types/models/ModuleModel.ts";
import {GameType} from "../../types/enums/GameType.ts";
import {useWizardStore} from "./store/useWizardStore.ts";
import mainImage from './assets/wizard.jpg';
import {WizardHomePage} from "./components/WizardHomePage.tsx";
import {WizardRoute} from "./type/WizardRoute.ts";
import {WizardSettingsPage} from "./components/WizardSettingsPage.tsx";
import {WizardPlayersPage} from "./components/WizardPlayersPage.tsx";
import {WizardBidPage} from "./components/WizardBidPage.tsx";
import {WizardScoringPage} from "./components/WizardScoringPage.tsx";

export const wizardModule: ModuleModel = {
  type: GameType.Wizard,
  name: 'Wizard',
  description: 'Scoring for Wizard (3 to 6 players).',
  gameStore: useWizardStore,
  mainImage: mainImage,
  routes: [
    {
      path: WizardRoute.Home,
      Component: WizardHomePage,
    },
    {
      path: WizardRoute.Settings,
      Component: WizardSettingsPage,
    },
    {
      path: WizardRoute.Players,
      Component: WizardPlayersPage,
    },
    {
      path: WizardRoute.Bid,
      Component: WizardBidPage,
    },
    {
      path: WizardRoute.Scoring,
      Component: WizardScoringPage,
    },
  ],
  homePath: WizardRoute.Home,
};
