// region imports

import {type StateCreator} from 'zustand';
import type {PlayerModel} from "../../types/models/PlayerModel.ts";
import type {GameState} from "../game/GameStore.ts";
import type {PlayersStore} from "../players/PlayersStore.ts";

// endregion

// region exports

/**
 * This function can be used to add support for players to a store. It expects a type that extends
 * {@link PlayerModel}.
 *
 * When using the function, you need to specify both the {@link PlayerModel} type and the final
 * store type that extends {@link PlayersState} and {@link PlayersActions}.
 *
 * @param resetActive
 *   When {@link resetActive} is set to `true`, adding, removing, or updating a player will set the
 *   game to inactive by setting {@link active} to `false`. When set to `false`, the game
 *   will remain active. Changing the player's name does not affect the active state of the game.
 * @param config
 *   The store the players part is added to.
 *
 * @returns a Zustand store creator function.
 */
export function withPlayers<TModel extends PlayerModel, TStore extends (GameState & PlayersStore<TModel>)>(
  resetActive: boolean,
  config: StateCreator<TStore, [], [], Omit<TStore, keyof PlayersStore<TModel>>>
): StateCreator<TStore, [], [], TStore> {
  return (set, get, api) => {
    // implement the store methods
    const baseState: PlayersStore<TModel> = {
      players: [],

      addPlayer: (player: TModel, restart?: boolean) => set((state) => {
        // wizard can be played with max 6 players
        return {
          players: [
            ...state.players,
            player,
          ],
          active: state.active && !resetActive && (restart !== true),
        } as Partial<TStore>;
      }),

      updatePlayers: (players: TModel[]) => set((state) => {
        return {
          // use copy of array if they are equal to make sure the field change is detected
          players: players === state.players ? [...players] : players,
          active: state.active && !resetActive,
        } as Partial<TStore>;
      }),

      removeAllPlayers: () => set({
        players: [] as TModel[],
        active: false,
      } as Partial<TStore>),

      changePlayerName: (index: number, playerName: string) => set((state) => {
        const players = [...state.players];
        players[index].name = playerName;
        return {
          players,
        } as Partial<TStore>;
      }),

      selectFirstPlayer: (index: number) => set((state) => {
        const players = [...state.players];
        players.forEach((player, playerIndex) => player.first = playerIndex === index);
        return {
          players,
          active: state.active && !resetActive,
        } as Partial<TStore>;
      }),

      removePlayer: (index: number) => set((state) => {
        const players = [...state.players];
        players.splice(index, 1);
        return {
          players,
          active: state.active && !resetActive,
        } as Partial<TStore>;
      }),

      swapPlayers: (first: number, second: number) => set((state) => {
        const players = [...state.players];
        [players[first], players[second]] = [players[second], players[first]];
        return {
          players,
          active: state.active && !resetActive,
        } as Partial<TStore>;
      }),

      willResetActive: () => resetActive,
    };

    return {
      ...(baseState as unknown as TStore),
      ...config(set, get, api),
    };
  };
}

// endregion