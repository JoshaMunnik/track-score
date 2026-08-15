// region imports

import {createSharableGameStore} from "../../../store/sharable/createSharableGameStore.ts";
import {useTeamStore} from "./useTeamStore.ts";

// endregion

// region exports

export const useTeamSharableStore = createSharableGameStore('team-sharable', useTeamStore);

// endregion
