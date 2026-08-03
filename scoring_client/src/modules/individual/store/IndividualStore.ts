// region imports

import type {
  StorableGameActions,
  StorableGameState
} from "../../../store/storable/StorableGameStore.ts";
import type {PlayersActions, PlayersState} from "../../../store/players/PlayersStore.ts";
import type {IndividualConfigurationModel} from "../models/IndividualConfigurationModel.ts";
import type {IndividualPlayerModel} from "../models/IndividualPlayerModel.ts";
import type {
  ConfigurationActions,
  ConfigurationState
} from "../../../store/configuration/ConfigurationStore.ts";

// endregion

// region exports

export type IndividualState = StorableGameState &
  PlayersState<IndividualPlayerModel> &
  ConfigurationState<IndividualConfigurationModel> &
  Readonly<{
    /**
     * Current round
     */
    round: number;

    /**
     * Round scores being entered for.
     */
    scoringRound: number;
  }>;

export type IndividualActions = StorableGameActions &
  ConfigurationActions<IndividualConfigurationModel> &
  PlayersActions<IndividualPlayerModel> &
  Readonly<{
    /**
     * Start playing
     */
    start(): void;

    /**
     * Advances to the next round, updating the store accordingly. Might change the state to finished
     * if one or more players have reached the maximum score.
     */
    nextRound(): void;

    /**
     * Sets the round for which scores are being entered.
     */
    setScoringRound(round: number): void;

    /**
     * Updates the player score for the scoring round.
     *
     * @param index
     *   Player index
     * @param score
     *   New score to set
     */
    setPlayerScore(index: number, score: number): void;

    /**
     * Done with the game; set the store to a finished state. This method only needs to be called
     * if {@link useMaxScore} is `false`.
     */
    done(): void;

    /**
     * Restarts the game with current players; resetting their scores and round.
     */
    restart(): void;

    /**
     * Removes all players and resets the round, but keeps the current config.
     */
    newPlayers(): void;
  }>;

export type IndividualStore = IndividualState & IndividualActions;

// endregion