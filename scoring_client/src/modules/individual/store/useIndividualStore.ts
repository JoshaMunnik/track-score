// region imports

import {create} from "zustand/react";
import type {IndividualPlayerModel} from "../models/IndividualPlayerModel.ts";
import {decodeBase64, encodeBase64, getGameSessionId} from "../../../tools/mainTools.ts";
import {GameType} from "../../../types/enums/GameType.ts";
import {getPlayerNames} from "../../../tools/playerTools.ts";
import {withDevtoolsAndPersist} from "../../../store/middleware/withDevtoolsAndPersist.ts";
import type {IndividualConfigurationModel} from "../models/IndividualConfigurationModel.ts";
import {
  withConfigurationAndPlayers
} from "../../../store/middleware/withConfigurationAndPlayers.ts";
import {calcIndividualScore, expandIndividualScores} from "../tools/individualTools.ts";
import {initialIndividualConfigurations} from "./useIndividualConfigrationsStore.ts";
import type {IndividualState, IndividualStore} from "./IndividualStore.ts";

// endregion

// region local

const initialState: IndividualState = {
  active: false,
  finished: false,
  gameSessionId: '',
  round: 0,
  scoringRound: 0,
  players: [],
  configuration: {
    // use a copy, making sure config does not reference the same object
    ...initialIndividualConfigurations[0],
  },
}

/**
 * Checks if there is a maximum score and at least one player has reached it. If not, returns the
 * current finished state.
 *
 * @param players
 *   Players to check
 * @param state
 *   State to get the config and current finished state from
 *
 * @returns new finished state
 */
function isFinished(players: IndividualPlayerModel[], state: IndividualState): boolean {
  if (!state.configuration.useMaxScore) {
    return state.finished;
  }
  for (const player of players) {
    const score = calcIndividualScore(player, state.round);
    if (score >= state.configuration.maxScore) {
      return true;
    }
  }
  return false;
}

/**
 * Includes the config name in the summary.
 */
function getSummary(state: IndividualState): string {
  return state.configuration.name + ': ' + getPlayerNames(state.players);
}

// endregion

// region exports

// noinspection DuplicatedCode
export const useIndividualStore = create<IndividualStore>()(
  withDevtoolsAndPersist(
    'individual',
    withConfigurationAndPlayers<
      IndividualConfigurationModel, IndividualPlayerModel, IndividualStore
    >(
      false,
      (set, get) => ({
        ...initialState,

        reset: () => set(initialState),

        resetGame: () => set({
          active: false,
          finished: false,
        }),

        getType: () => GameType.Individual,

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
            scores: expandIndividualScores(player.scores, round)
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
          const nextRound = state.round + 1;
          return {
            round: nextRound,
            scoringRound: nextRound,
            finished: finished,
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
          const newState: IndividualState = decodeBase64(data);
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