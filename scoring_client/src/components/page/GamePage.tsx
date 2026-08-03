// region imports

import {Page, type PageProps} from "./Page.tsx";
import type {ZustandStore} from "../../types/store/ZustandStore.ts";
import type {GameState} from "../../store/game/GameStore.ts";
import {useShallow} from "zustand/react/shallow";
import {wakeLockService} from "../../services/wakeLockService.ts";
import {useEffect} from "react";
import {useMainStore} from "../../store/main/useMainStore.ts";

// endregion

// region exports

export type GamePageProps = PageProps & Readonly<{
  /**
   * Store containing the active state that will be tracked.
   */
  gameStore: ZustandStore<GameState>;
}>;

/**
 * {@link GamePage} tracks {@link GameState.active} and requests a wake lock when the game is
 * active, releasing it when the game is inactive.
 */
export function GamePage({gameStore, ...props}: GamePageProps) {
  const {active} = gameStore(useShallow((state) => ({
    active: state.active,
  })));
  const {useWakeLock} = useMainStore(useShallow((state) => ({
    useWakeLock: state.useWakeLock,
  })));
  useEffect(
    () => {
      if (active && useWakeLock) {
        // noinspection JSIgnoredPromiseFromCall
        wakeLockService.request();
      } else {
        // noinspection JSIgnoredPromiseFromCall
        wakeLockService.release();
      }
      return () => {
        // noinspection JSIgnoredPromiseFromCall
        wakeLockService.release();
      };
    },
    [active, useWakeLock]
  );
  return (<Page {...props} />);
}

// endregion