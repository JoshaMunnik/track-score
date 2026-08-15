// region imports

import {devtools, persist} from 'zustand/middleware';
import {type StateCreator} from 'zustand';

// endregion

// region exports

/**
 * A middleware the combines devtools and persist for Zustand stores.
 *
 * @param name
 *   Name is used for both devtools and persist. It is the name of the store in devtools and the
 *   key in localStorage for persist.
 * @param initializer
 *   Store initializer function that defines the state and actions of the store.
 */
export const withDevtoolsAndPersist = <T extends object>(
  name: string,
  initializer: StateCreator<T, [["zustand/devtools", never], ["zustand/persist", unknown]]>,
) => {
  return devtools(
    persist(initializer, {name: name}),
    {store: name}
  );
};

// endregion
