// region imports

import type {ConfigurationModel} from "../../../types/models/ConfigurationModel.ts";

// endregion

// region exports

/**
 * {@link IndividualConfigurationModel} defines the properties for a individual scoring
 * config.
 */
export type IndividualConfigurationModel = ConfigurationModel & Readonly<{
  /**
   * When true, validate scores that they are a multiple of {@link scoreInterval}
   */
  useScoreInterval: boolean;

  /**
   * Minimal score interval (used to validate score)
   */
  scoreInterval: number;

  /**
   * When true, play until one or more players scores passes the maximum score
   */
  useMaxScore: boolean;

  /**
   * Maximum score to reach
   */
  maxScore: number;

  /**
   * Minimum player count
   */
  minPlayerCount: number;

  /**
   * Maximum player count
   */
  maxPlayerCount: number;

  /**
   * When true, show who's the dealer every round
   */
  trackDealer: boolean;
}>;

// endregion
