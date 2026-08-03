// region imports

import type {
  StorableGameActions,
  StorableGameState
} from "../../../store/storable/StorableGameStore.ts";
import type {WizardPlayerModel} from "../models/WizardPlayerModel.ts";
import type {WizardConfig} from "./WizardConfig.ts";
import type {WizardPhase} from "../type/WizardPhase.ts";
import type {PlayersActions, PlayersState} from "../../../store/players/PlayersStore.ts";

// endregion

// region exports

/**
 * The state definition used for the wizard part in the store
 */
export type WizardState = StorableGameState &
  PlayersState<WizardPlayerModel> &
  Readonly<WizardConfig & {
    /**
     * Current round
     */
    round: number;

    /**
     * Round to enter scoring for
     */
    scoringRound: number;

    /**
     * Current phase in the game
     */
    phase: WizardPhase;
  }>;

export type WizardActions = StorableGameActions & PlayersActions<WizardPlayerModel> & {
  /**
   * Updates the config part of the store; this will also reset the state to a pending game
   * waiting to start.
   */
  setConfig(config: WizardConfig): void;

  /**
   * Resets the store to a state with new players (but keep current config).
   */
  newPlayers(): void;

  /**
   * Starts playing a game of wizard. It will set a new game session id, initial round and correct
   * phase.
   */
  start(): void;

  /**
   * Starts the next round. If there are no more rounds, finished will be set to true.
   */
  nextRound(): void;

  /**
   * Sets a specific round to enter scoring for.
   */
  setScoringRound(round: number): void;

  /**
   * Switches to the scoring part of a round.
   */
  startScoring(): void;

  /**
   * Sets the bid for a specific player for the current round. This will also set the taken to the
   * same value.
   *
   * @param index
   *   The index of the player.
   * @param bids
   *   The number of bids.
   */
  setBid(index: number, bids: number): void;

  /**
   * Sets the number of tricks taken for a specific player for the scoring round.
   *
   * @param index
   *   The index of the player.
   * @param taken
   *   The number of tricks taken.
   */
  setTaken(index: number, taken: number): void;
};

export type WizardStore = WizardState & WizardActions;

// endregion
