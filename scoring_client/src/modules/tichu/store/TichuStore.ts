// region imports

import type {
  StorableGameActions,
  StorableGameState
} from "../../../store/storable/StorableGameStore.ts";
import type {PlayersActions, PlayersState} from "../../../store/players/PlayersStore.ts";
import type {TichuRoundModel} from "../models/TichuRoundModel.ts";
import type {TichuPlayerModel} from "../models/TichuPlayerModel.ts";
import type {TichuTeamRoundModel} from "../models/TichuTeamRoundModel.ts";

// endregion

// region exports

export type TichuState = StorableGameState &
  PlayersState<TichuPlayerModel> &
  Readonly<{
    /**
     * Played rounds
     */
    rounds: TichuRoundModel[];

    /**
     * Active round for first team
     */
    firstTeam: TichuTeamRoundModel;

    /**
     * Active round for second team
     */
    secondTeam: TichuTeamRoundModel;
  }>;

export type TichuActions = StorableGameActions &
  PlayersActions<TichuPlayerModel> &
  Readonly<{
    /**
     * Start playing
     */
    start(): void;

    /**
     * Replays the current round, removing it from the played rounds.
     */
    replayRound(): void;

    /**
     * Adds a finished round. This might set the finished state.
     *
     * @param data
     */
    addRound(data: TichuRoundModel): void;

    /**
     * Updates one or more fields of the first team.
     *
     * @param data
     */
    updateFirstTeam(data: Partial<TichuTeamRoundModel>): void;

    /**
     * Updates one or more fields of the second team.
     *
     * @param data
     */
    updateSecondTeam(data: Partial<TichuTeamRoundModel>): void;

    /**
     * Restarts the game with current players; resetting their scores and round.
     */
    restart(): void;
  }>;

export type TichuStore = TichuState & TichuActions;

// endregion