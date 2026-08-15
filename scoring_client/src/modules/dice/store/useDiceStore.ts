// region imports

import {create} from "zustand/react";
import {getRolls} from "../../../tools/diceTools.ts";
import {withDevtoolsAndPersist} from "../../../store/middleware/withDevtoolsAndPersist.ts";
import {initialDiceConfigurations} from "./useDiceConfigurationsStore.ts";
import {withConfiguration} from "../../../store/middleware/withConfiguration.ts";
import type {DiceState, DiceStore} from "./DiceStore.ts";

// endregion

// region local

const initialState: DiceState = {
  rolls: [],
  preRolls: [],
  active: false,
  configuration: initialDiceConfigurations[0],
};

/**
 * The state when no game is active
 */
const idleState: Partial<DiceState> = {
  rolls: [],
  preRolls: [],
  active: false,
}

// endregion

// region exports

export const useDiceStore = create<DiceStore>()(
  withDevtoolsAndPersist('dice', withConfiguration(
    (set) => ({
      ...initialState,

      reset: () => set(initialState),

      resetGame: () => set(idleState),

      rollDice: () => set((state) => {
        const preRolls: number[] = state.active ? [...state.preRolls] : [];
        const configuration = state.configuration;
        const rolls = getRolls(
          preRolls,
          configuration.diceCount,
          configuration.startNumber,
          configuration.endNumber,
          configuration.useGroups,
          configuration.groupCount,
        );
        return {
          active: true,
          rolls: rolls,
          preRolls: preRolls,
        }
      }),
    })
  ))
);

// endregion

