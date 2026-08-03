// region imports

import {create} from 'zustand/react';
import {getRolls} from "../../../tools/diceTools.ts";
import {UFMath} from "@ultraforce/ts-general-lib";
import {isBarbarianShip} from "../tools/catanTools.ts";
import {withDevtoolsAndPersist} from "../../../store/middleware/withDevtoolsAndPersist.ts";
import type {DiceCatanState, DiceCatanStore} from "./DiceCatanStore.ts";

// endregion

// region local variables

const initialState: DiceCatanState = {
  active: false,
  useGroups: true,
  groupCount: 3,
  trackBarbarians: true,
  barbarianShipMoves: 7,
  ignoreSevens: true,
  rolls: [],
  preRolls: [],
  barbarianShipPosition: 0,
  invaded: false
};

// endregion

// region exports

export const useDiceCatanStore = create<DiceCatanStore>()(
  withDevtoolsAndPersist(
    'dice-catan',
    (set) => ({
      ...initialState,

      setConfig: (config) => set(() => ({
        ...config,
        active: false,
        invaded: false,
        preRolls: [],
        rolls: [],
        barbarianShipPosition: config.barbarianShipMoves - 1,
      })),

      reset: () => set(initialState),

      resetGame: () => set((state) => ({
        active: false,
        invaded: false,
        preRolls: [],
        rolls: [],
        barbarianShipPosition: state.barbarianShipMoves - 1,
      })),

      moveBarbarianShip: () => set((state) => {
        const newPosition = (state.barbarianShipPosition === 0) ? state.barbarianShipMoves - 1 : state.barbarianShipPosition - 1;
        return {
          active: true,
          barbarianShipPosition: newPosition,
          invaded: state.invaded || (newPosition === 0),
        }
      }),

      rollDice: () => set((state) => {
        let done = false;
        let rolls: number[] = [];
        const preRolls: number[] = [...state.preRolls];
        while (!done) {
          rolls = getRolls(
            preRolls,
            2,
            1,
            6,
            state.useGroups,
            state.groupCount
          );
          done = state.invaded || !state.ignoreSevens || !state.trackBarbarians ||
            (rolls[0] + rolls[1] !== 7);
        }
        let position: number = state.barbarianShipPosition;
        if (state.trackBarbarians) {
          rolls[2] = UFMath.randomInteger(1, 6);
          if (isBarbarianShip(rolls[2])) {
            position--;
            if (position < 0) {
              position = state.barbarianShipMoves - 1;
            }
          }
        }
        return {
          active: true,
          rolls: rolls,
          preRolls: preRolls,
          barbarianShipPosition: position,
          invaded: state.invaded || (position === 0),
        }
      }),
    })
  )
);

// endregion