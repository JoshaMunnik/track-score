// region imports

import {create} from "zustand/react";
import type {TichuPlayerModel} from "../models/TichuPlayerModel.ts";
import {decodeBase64, encodeBase64, getGameSessionId} from "../../../tools/mainTools.ts";
import {GameType} from "../../../types/enums/GameType.ts";
import {getPlayerNames} from "../../../tools/playerTools.ts";
import {withDevtoolsAndPersist} from "../../../store/middleware/withDevtoolsAndPersist.ts";
import {calcTichuScores} from "../tools/tichuTools.ts";
import type {TichuRoundModel} from "../models/TichuRoundModel.ts";
import {withPlayers} from "../../../store/middleware/withPlayers.ts";
import type {TichuTeamRoundModel} from "../models/TichuTeamRoundModel.ts";
import {TichuResultType} from "../type/TichuResultType.ts";
import type {TichuState, TichuStore} from "./TichuStore.ts";

// endregion

// region local

/**
 * Checks if there is a score of 1000 or more and at least one team has reached it. If not, returns
 * the current finished state.
 *
 * @param rounds
 *   Rounds to check
 * @param state
 *   State to get the config and current finished state from
 *
 * @returns new finished state
 */
function isFinished(rounds: TichuRoundModel[], state: TichuState): boolean {
  const scores = calcTichuScores(rounds, rounds.length);
  return (scores[0] >= 1000) || (scores[1] >= 1000) || state.finished;
}

function createTeamRound(): TichuTeamRoundModel {
  return {
    cardScore: 50,
    first: false,
    grandTichu: false,
    tichu0: false,
    tichu1: false,
    result: TichuResultType.None,
  }
}

const initialState: TichuState = {
  active: false,
  gameSessionId: '',
  finished: false,
  players: [],
  rounds: [],
  firstTeam: createTeamRound(),
  secondTeam: createTeamRound(),
}

// endregion

// region exports

// noinspection DuplicatedCode
export const useTichuStore = create<TichuStore>()(
  withDevtoolsAndPersist(
    'tichu',
    withPlayers<TichuPlayerModel, TichuStore>(
      true,
      (set, get) => ({
        ...initialState,

        reset: () => set(initialState),

        resetGame: () => set({active: false}),

        getType: () => GameType.Tichu,

        getSummary: () => getPlayerNames(get().players),

        start: () => set((state) => ({
          gameSessionId: getGameSessionId(),
          players: state.players,
          rounds: [],
          firstTeam: createTeamRound(),
          secondTeam: createTeamRound(),
          active: true,
          finished: false,
        })),

        replayRound: () => set((state) => {
          const rounds = [...state.rounds];
          if (rounds.length > 0) {
            rounds.pop();
          }
          return {
            rounds,
            firstTeam: createTeamRound(),
            secondTeam: createTeamRound(),
            finished: false,
          }
        }),

        addRound: (data: TichuRoundModel) => set((state) => {
          const rounds = [...state.rounds, data];
          return {
            rounds,
            firstTeam: createTeamRound(),
            secondTeam: createTeamRound(),
            finished: isFinished(rounds, state),
          };
        }),

        getData: (): string => encodeBase64(get()),

        setData: (data: string) => {
          const newState: TichuState = decodeBase64(data);
          set(newState);
        },

        restart: () => set((state) => ({
          players: [...state.players],
          rounds: [],
          firstTeam: createTeamRound(),
          secondTeam: createTeamRound(),
          active: true,
          finished: false,
        })),

        updateFirstTeam: (data) => set((state) => {
          const firstTeam = {
            ...state.firstTeam,
            ...data,
          };
          const secondTeam = {
            ...state.secondTeam,
            first: state.secondTeam.first && !firstTeam.first,
            cardScore: 100 - firstTeam.cardScore,
            result: (firstTeam.result !== TichuResultType.None) || firstTeam.first
              ? TichuResultType.None
              : state.secondTeam.result,
          };
          return {
            firstTeam,
            secondTeam,
          };
        }),

        updateSecondTeam: (data) => set((state) => {
          const secondTeam = {
            ...state.secondTeam,
            ...data,
          };
          const firstTeam = {
            ...state.firstTeam,
            first: state.firstTeam.first && !secondTeam.first,
            cardScore: 100 - secondTeam.cardScore,
            result: (secondTeam.result !== TichuResultType.None) || secondTeam.first
              ? TichuResultType.None
              : state.firstTeam.result,
          };
          return {
            firstTeam,
            secondTeam,
          };
        }),
      }),
    ))
);

// endregion