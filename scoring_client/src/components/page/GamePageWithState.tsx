// region imports

import type {LocationStateModel} from "../../types/models/LocationStateModel.ts";
import {useLocation} from "react-router";
import {useEffect, useRef} from "react";
import {GamePage, type GamePageProps} from "./GamePage.tsx";

// endregion

// region local

type GamePageWithStateProps = GamePageProps & Readonly<{
  /**
   * This callback called when the location has a state attached to it.
   */
  onProcessState(state: LocationStateModel): void;
}>;

// endregion

// region exports

/**
 * {@link GamePageWithState} checks if the location has a valid state and calls the
 * {@link onProcessState} if there is; the state gets cleared so this callback is only called
 * once.
 */
export function GamePageWithState({onProcessState, ...pageProps}: GamePageWithStateProps) {
  const location = useLocation();
  const state = location.state as LocationStateModel | null;
  // store the latest callback in a ref so it can change without re-triggering the effect and
  // creating an infinite loop
  const savedOnProcessState = useRef(onProcessState);
  useEffect(() => {
    savedOnProcessState.current = onProcessState;
  }, [onProcessState]);
  useEffect(
    () => {
      if (state) {
        savedOnProcessState.current(state);
        window.history.replaceState(null, document.title);
      }
    },
    [state]
  );
  return <GamePage {...pageProps} />;
}

// endregion
