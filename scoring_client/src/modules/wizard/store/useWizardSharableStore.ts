// region imports

import {createSharableGameStore} from "../../../store/sharable/createSharableGameStore.ts";
import {useWizardStore} from "./useWizardStore.ts";

// endregion

// region exports

export const useWizardSharableStore = createSharableGameStore('wizard-sharable', useWizardStore);

// endregion
