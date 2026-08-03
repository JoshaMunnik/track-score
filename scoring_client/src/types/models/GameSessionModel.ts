// region imports

import type {GameType} from '../enums/GameType.ts';

// endregion

// region exports

/**
 * Data relevant for a gaming session.
 *
 * Note: this type should only use primitive types, since it will be stored and retrieved from the
 * local storage.
 */
export type GameSessionModel = {
  /**
   * Unique id of the game session
   */
  id: string;

  /**
   * Type of the game session
   */
  type: GameType;

  /**
   * Date in milliseconds since 1970 (see Date.getTime)
   */
  date: number;

  /**
   * When `true` the game was finished.
   */
  finished: boolean;

  /**
   * This will be shown below the game title.
   */
  summary: string;

  /**
   * Session data.
   */
  data: string;
}

// endregion
