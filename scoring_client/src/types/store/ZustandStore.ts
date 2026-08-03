// region imports

import type {UseBoundStore} from "zustand/react";
import type {StoreApi} from "zustand/vanilla";

// endregion

// region exports

/**
 * A shortcut type that defines the type of a zustand store.
 */
export type ZustandStore<T> = UseBoundStore<StoreApi<T>>;
