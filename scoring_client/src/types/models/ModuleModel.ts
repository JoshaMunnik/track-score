// region imports

import type {GameType} from '../enums/GameType.ts';
import type {RouteObject} from 'react-router';
import type {ZustandStore} from "../store/ZustandStore.ts";
import type {ResettableActions} from "../../store/resettable/ResettableActions.ts";

// endregion

// region exports

export type ModuleModel = Readonly<{
  /**
   * Type of the game.
   */
  type: GameType;

  /**
   * Name of the game
   */
  name: string;

  /**
   * A description of the game
   */
  description: string;

  /**
   * Url to image
   */
  mainImage: string;

  /**
   * Routes used by the module
   */
  routes: RouteObject[];

  /**
   * Path to main page of the game
   */
  homePath: string;

  /**
   * A zustand store that can be reset if needed.
   */
  gameStore: ZustandStore<ResettableActions>;

  /**
   * An optional zustand store that can be reset if needed.
   */
  configurationsStore?: ZustandStore<ResettableActions>;
}>;

// endregion