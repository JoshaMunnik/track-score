// region imports

import type {GameType} from '../../enums/GameType.ts';

// endregion

// region exports

/**
 * Data returned by the server when getting a game session.
 */
export type ServerGameSessionModel = {
  type: GameType;
  finished: number;
  data: string;
  sequence: number;
}

// endregion
