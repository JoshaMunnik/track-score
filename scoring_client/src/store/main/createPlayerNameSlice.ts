// region imports

import type {StateCreator} from "zustand";
import type {MainStore} from "./MainStore.ts";
import type {PlayerNameSlice, PlayerNameState} from "./PlayerNameSlice.ts";
import type {PlayerModel} from "../../types/models/PlayerModel.ts";

// endregion

// region local

/**
 * Adds a name to the {@link names} array. The name is trimmed and a case incentive check is made
 * if the name is not already in the {@link names} array. If it is, the name in the {@link names}
 * array is updated else the name is added to the {@link names} array.
 *
 * @param names
 *   Current list of names; this array will be changed itself, no new array is created.
 * @param name
 *   New name to add
 *
 * @returns the value of {@link names}
 */
function addName(names: string[], name: string): string[] {
  const cleanedName = name.trim();
  if (cleanedName.length === 0) {
    return names;
  }
  const unifiedName = cleanedName.toLocaleLowerCase();
  for (let index = 0; index < names.length; index++) {
    if (unifiedName === names[index].toLocaleLowerCase()) {
      names[index] = cleanedName;
      return names;
    }
  }
  names.push(cleanedName);
  return names;
}

// endregion

// region exports

export const initialPlayerNameState: PlayerNameState = {
  playerNames: [],
  selectPlayerNameVisible: false,
  onSelectPlayerName: undefined,
};

export const createPlayerNameSlice: StateCreator<
  MainStore,
  [], // Middleware types (leave empty if not using any middleware here)
  [],
  PlayerNameSlice
> = (set) => ({
  ...initialPlayerNameState,

  addPlayerName: (name: string) => set((state) => ({
    playerNames: [...addName(state.playerNames, name)],
  })),

  removePlayerNames: () => set({
    playerNames: [],
  }),

  addPlayerNames: (players: PlayerModel[]) => set((state) => ({
    playerNames: players.reduce(
      (names, current: PlayerModel) => addName(names, current.name), [...state.playerNames]
    ),
  })),

  showPlayerNames: (onSelect) => set({
    onSelectPlayerName: onSelect,
    selectPlayerNameVisible: true,
  }),

  hidePlayerNames: () => set({
    selectPlayerNameVisible: false,
    onSelectPlayerName: undefined,
  }),
});

// endregion