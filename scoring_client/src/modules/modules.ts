// region imports

import type {ModuleModel} from "../types/models/ModuleModel.ts";
import {diceCatanModule} from "./dice-catan/diceCatanModule.ts";
import {wizardModule} from "./wizard/wizardModule.ts";
import {diceModule} from "./dice/diceModule.ts";
import {individualModule} from "./individual/individualModule.ts";
import {teamModule} from "./team/teamModule.ts";
import {tichuModule} from "./tichu/tichuModule.ts";

// endregion

// region exports

/**
 * Contains definitions for every module.
 */
export const modules: ModuleModel[] = [
  diceCatanModule,
  diceModule,
  wizardModule,
  individualModule,
  teamModule,
  tichuModule,
];

// endregion