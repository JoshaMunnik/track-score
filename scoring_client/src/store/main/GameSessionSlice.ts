import type {GameSessionModel} from "../../types/models/GameSessionModel.ts";

export type GameSessionState = {
  /**
   * Games played so far. Every {@link GameSessionModel} is stored using the id as the key.
   */
  gameSessions: Record<string, GameSessionModel>;
};

export type GameSessionActions = {
  /**
   * Games played so far. Every {@link GameSessionModel} is stored using the id as the key.
   */
  gameSessions: Record<string, GameSessionModel>;

  /**
   * Updates a stored game session. If the session does not exist yet, it will be added.
   * If it already exists, it will be replaced.
   */
  updateGameSession(session: GameSessionModel): void;

  /**
   * Removes a stored game session by its id.
   */
  removeGameSession(id: string): void;

  /**
   * Removes all stored game sessions.
   */
  removeGameSessions(): void;
};

export type GameSessionSlice = GameSessionState & GameSessionActions;