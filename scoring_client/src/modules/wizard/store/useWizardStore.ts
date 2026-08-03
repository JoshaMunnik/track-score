// region imports

import {create} from "zustand/react";
import {decodeBase64, encodeBase64, getGameSessionId} from "../../../tools/mainTools.ts";
import {WizardPhase} from "../type/WizardPhase.ts";
import {GameType} from "../../../types/enums/GameType.ts";
import {getPlayerNames} from "../../../tools/playerTools.ts";
import {withDevtoolsAndPersist} from "../../../store/middleware/withDevtoolsAndPersist.ts";
import {withPlayers} from "../../../store/middleware/withPlayers.ts";
import {createWizardRounds} from "../tools/wizardTools.ts";
import type {WizardState, WizardStore} from "./WizardStore.ts";

// endregion

// region local types

const initialState: WizardState = {
  active: false,
  finished: false,
  gameSessionId: '',
  phase: WizardPhase.Bid,
  checkTotalBids: true,
  checkTotalBidsCount: 5,
  round: 0,
  scoringRound: 0,
  players: [],
}

// endregion

// region exports

export const useWizardStore = create<WizardStore>()(
  withDevtoolsAndPersist('wizard', withPlayers(
    false,
    (set, get) => ({
      ...initialState,

      setConfig: (config) => set({
        ...config,
        active: false,
        finished: false,
        phase: WizardPhase.Bid,
        round: 0,
        scoringRound: 0,
      }),

      reset: () => set(initialState),

      resetGame: () => set({
        active: false,
        finished: false,
      }),

      getType: () => GameType.Wizard,

      getSummary: () => getPlayerNames(get().players),

      newPlayers: () => set({
        players: [],
        round: 0,
        scoringRound: 0,
        active: false,
        finished: false,
        gameSessionId: '',
        phase: WizardPhase.Bid,
      }),

      setScoringRound: (round: number) => set({scoringRound: round}),

      startScoring: () => set({
        phase: WizardPhase.Scoring,
      }),

      start: () => set((state) => {
        const players = state.players.map(player => ({
          name: player.name,
          first: player.first,
          rounds: createWizardRounds(),
          startRound: 0,
          startScore: 0,
        }));
        return {
          gameSessionId: getGameSessionId(),
          players: players,
          round: 0,
          scoringRound: 0,
          active: true,
          finished: false,
          phase: WizardPhase.Bid,
        };
      }),

      nextRound: () => set((state) => {
        const nextRound = state.round + 1;
        if (nextRound >= 60 / state.players.length) {
          return {
            round: 60 / state.players.length,
            finished: true,
          };
        }
        return {
          round: nextRound,
          scoringRound: nextRound,
          phase: WizardPhase.Bid,
        }
      }),

      setBid: (index, bid) => set((state) => {
        const players = [...state.players];
        players[index].rounds[state.round] = {bid: bid, taken: bid};
        return {
          players,
          active: true,
          finished: false,
        };
      }),

      setTaken: (index, taken) => set((state) => {
        const players = [...state.players];
        players[index].rounds[state.scoringRound] = {
          ...players[index].rounds[state.scoringRound],
          taken,
        };
        return {
          players,
          active: true,
        };
      }),

      getData: (): string => encodeBase64(get()),

      setData: (data: string) => {
        const newState: WizardState = decodeBase64(data);
        set(newState);
      },
    }),
  ))
);

// endregion