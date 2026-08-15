// region imports

import {createSharableGameStore} from "../../../store/sharable/createSharableGameStore.ts";
import {useIndividualStore} from "./useIndividualStore.ts";

// endregion

// region exports

export const useIndividualSharableStore = createSharableGameStore('individual-sharable', useIndividualStore);

// endregion
