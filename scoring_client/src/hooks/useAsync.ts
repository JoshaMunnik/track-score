// region imports

import {type DependencyList, useEffect, useState} from "react";

// endregion

// region local

type AsyncState<T> = {
  /**
   * Data returned by the async function
   */
  data: T | null;

  /**
   * Error message if an error occurred while calling the function
   */
  error: string | null;

  /**
   * True while busy calling the function
   */
  calling: boolean;
}

// endregion

// region exports

/**
 * A hook to call an async function.
 *
 * @param asyncFn
 * @param dependencies
 */
export function useAsync<T>(
  asyncFn: () => Promise<T>,
  dependencies: DependencyList = []
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({data: null, calling: false, error: null});

  useEffect(
    () => {
      let isMounted = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(prev => ({...prev, calling: true, error: null}));
      // only update state if component is still mounted
      asyncFn()
        .then(
          data => isMounted && setState({data, calling: false, error: null})
        )
        .catch(
          error => isMounted && setState({data: null, calling: false, error: error.message})
        );
      return () => {
        isMounted = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );

  return state;
}

// endregion