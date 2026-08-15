// region imports

import {createSharableGameStore} from "../../../store/sharable/createSharableGameStore.ts";
import {useTichuStore} from "./useTichuStore.ts";

// endregion

// region exports

export const useTichuSharableStore = createSharableGameStore('tichu-sharable', useTichuStore);

// endregion
