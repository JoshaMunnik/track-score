// region imports

import type {
  StorableGameActions,
  StorableGameState
} from "../../../store/storable/StorableGameStore.ts";
import type {PlayersActions, PlayersState} from "../../../store/players/PlayersStore.ts";
import type {TeamConfigurationModel} from "../models/TeamConfigurationModel.ts";
import type {TeamPlayerModel} from "../models/TeamPlayerModel.ts";
import type {
  ConfigurationActions,
  ConfigurationState
} from "../../../store/configuration/ConfigurationStore.ts";

// endregion

// region exports

export type TeamState = StorableGameState &
  PlayersState<TeamPlayerModel> &
  ConfigurationState<TeamConfigurationModel> &
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

export type TeamActions = StorableGameActions &
  ConfigurationActions<TeamConfigurationModel> &
  PlayersActions<TeamPlayerModel> &
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
     * Sets the score for a player. This call might update the finished state as well.
     *
     * @param index
     *   Player index
     * @param score
     *   New score to set
     */
    setPlayerScore(index: number, score: number): void;

    /**
     * Done with the game; set the store to a finished state.
     */
    done(): void;

    /**
     * Restarts the game with current players; resetting their scores and round.
     */
    restart(): void;

    /**
     * Removes all players and resets the round.
     */
    newPlayers(): void;
  }>;

export type TeamStore = TeamState & TeamActions;

// endregion