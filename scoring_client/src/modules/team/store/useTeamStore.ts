// region imports

import {create} from "zustand/react";
import type {TeamPlayerModel} from "../models/TeamPlayerModel.ts";
import {decodeBase64, encodeBase64, getGameSessionId} from "../../../tools/mainTools.ts";
import {GameType} from "../../../types/enums/GameType.ts";
import {getPlayerNames} from "../../../tools/playerTools.ts";
import {withDevtoolsAndPersist} from "../../../store/middleware/withDevtoolsAndPersist.ts";
import type {TeamConfigurationModel} from "../models/TeamConfigurationModel.ts";
import {
  withConfigurationAndPlayers
} from "../../../store/middleware/withConfigurationAndPlayers.ts";
import {calcTeamScore, expandTeamScores} from "../tools/teamTools.ts";
import {initialTeamConfigurations} from "./useTeamConfigurationsStore.ts";
import type {TeamState, TeamStore} from "./TeamStore.ts";

// endregion

// region local


const initialState: TeamState = {
  active: false,
  gameSessionId: '',
  finished: false,
  round: 0,
  scoringRound: 0,
  players: [],
  configuration: initialTeamConfigurations[0],
}

/**
 * Checks if there is a maximum score and at least one team has reached it. If not, returns the
 * current finished state.
 *
 * @param players
 *   Players to check
 * @param state
 *   State to get the config and current finished state from
 *
 * @returns new finished state
 */
function isFinished(players: TeamPlayerModel[], state: TeamState): boolean {
  const configuration = state.configuration;
  if (!configuration.useMaxScore) {
    return state.finished;
  }
  for (let team = 0; team < configuration.teamCount; team++) {
    const teamScore = calcTeamScore(players, team, configuration, state.round);
    if (teamScore >= configuration.maxScore) {
      return true;
    }
  }
  return false;
}

/**
 * Includes the config name in the summary.
 */
function getSummary(state: TeamState): string {
  const configuration = state.configuration;
  return configuration.name + ': ' + getPlayerNames(state.players);
}

// endregion

// region exports

// noinspection DuplicatedCode
export const useTeamStore = create<TeamStore>()(
  withDevtoolsAndPersist(
    'team',
    withConfigurationAndPlayers<
      TeamConfigurationModel, TeamPlayerModel, TeamStore
    >(
      true,
      (set, get) => ({
        ...initialState,

        reset: () => set(initialState),

        resetGame: () => set({active: false}),

        getType: () => GameType.Team,

        getSummary: () => getSummary(get()),

        newPlayers: () => set({
          players: [],
          round: 0,
          scoringRound: 0,
          active: false,
          finished: false,
          gameSessionId: '',
        }),

        setScoringRound: (round: number) => set((state) => {
          const players = state.players.map(player => ({
            ...player,
            scores: expandTeamScores(player.scores, round)
          }));
          return {
            players: players,
            scoringRound: round
          };
        }),

        start: () => set((state) => {
          const players = state.players.map(player => ({
            name: player.name,
            first: player.first,
            scores: [],
          }));
          return {
            gameSessionId: getGameSessionId(),
            players: players,
            round: 0,
            scoringRound: 0,
            active: true,
            finished: false,
          };
        }),

        nextRound: () => set((state) => {
          const finished = isFinished(state.players, state);
          const nextRound = finished ? state.round : state.round + 1;
          return {
            active: true,
            finished: finished,
            round: nextRound,
            scoringRound: nextRound,
          }
        }),

        setPlayerScore: (index, score) => set((state) => {
          // no changes if score is unchanged
          if (state.players[index].scores[state.scoringRound] === score) {
            return {};
          }
          const players = [...state.players];
          players[index].scores[state.scoringRound] = score;
          return {
            players: players,
            active: true,
            finished: isFinished(players, state),
          };
        }),

        done: () => set({
          finished: true,
        }),

        getData: (): string => encodeBase64(get()),

        setData: (data: string) => {
          const newState: TeamState = decodeBase64(data);
          set(newState);
        },

        restart: () => set((state) => {
          const players = state.players.map(player => ({
            name: player.name,
            first: player.first,
            scores: [],
          }));
          return {
            players: players,
            round: 0,
            scoringRound: 0,
            active: true,
            finished: false,
          };
        }),
      }),
    ))
);

// endregion