// region imports

import type {ConfigurationModel} from "../../types/models/ConfigurationModel.ts";
import type {PlayerModel} from "../../types/models/PlayerModel.ts";
import type {GameState} from "../game/GameStore.ts";
import type {PlayersStore} from "../players/PlayersStore.ts";
import type {StateCreator} from "zustand";
import {withPlayers} from "./withPlayers.ts";
import {withConfiguration} from "./withConfiguration.ts";
import type {ConfigurationStore} from "../configuration/ConfigurationStore.ts";

// endregion

// region exports

/**
 * Helper middleware to combine a config and players; making sure typing is correct so that
 * the store is still required to implement all other fields and actions.
 *
 * @param resetActive
 * @param config
 */
export function withConfigurationAndPlayers<
  TConfiguration extends ConfigurationModel,
  TPlayer extends PlayerModel,
  TStore extends (GameState & ConfigurationStore<TConfiguration> & PlayersStore<TPlayer>)
>(
  resetActive: boolean,
  config: StateCreator<
    TStore,
    [],
    [],
    Omit<TStore, keyof ConfigurationStore<TConfiguration> | keyof PlayersStore<TPlayer>>
  >
): StateCreator<TStore, [], [], TStore> {
  return withConfiguration<TConfiguration, TStore>(
    withPlayers<TPlayer, TStore>(
      resetActive,
      config as StateCreator<TStore, [], [], Omit<TStore, keyof PlayersStore<TPlayer>>>
    )
  );
}

// endregion