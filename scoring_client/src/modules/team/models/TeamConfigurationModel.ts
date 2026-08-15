// region Imports

import type {ConfigurationModel} from "../../../types/models/ConfigurationModel.ts";

// endregion

// region Types

/**
 * {@link TeamConfigurationModel} defines the properties for a team scoring config.
 */
export type TeamConfigurationModel = ConfigurationModel & Readonly<{
  /**
   * Number of teams
   */
  teamCount: number;

  /**
   * Players per team
   */
  playerCount: number;

  /**
   * When true, validate scores that they are a multiple of {@link scoreInterval}
   */
  useScoreInterval: boolean;

  /**
   * Minimal score interval (used to validate score)
   */
  scoreInterval: number;

  /**
   * When true, play until one or more teams scores passes the maximum score
   */
  useMaxScore: boolean;

  /**
   * Maximum score to reach
   */
  maxScore: number;

  /**
   * When true, show who's the dealer every round
   */
  trackDealer: boolean;
}>;

// endregion
