// region imports

import type {GameSessionModel} from "../types/models/GameSessionModel.ts";
import {apiService} from "./apiService.ts";
import type {UseBoundStore} from "zustand/react";
import type {StoreApi} from "zustand/vanilla";
import type {StorableGameActions} from "../store/storable/StorableGameStore.ts";

// endregion

// region local

/**
 * The minimum delay between sending game session updates to the server.
 */
const SEND_DELAY: number = 2000;

/**
 * The interval at which to track game sessions at the server.
 */
const CHECK_INTERVAL: number = 1500;

type SendGameSessionJob = {
  code: string;
  session: GameSessionModel;
};

type TrackGameSession = {
  code: string;
  sequence: number;
  store: UseBoundStore<StoreApi<StorableGameActions>>
}

// endregion

// region exports

/**
 * A service to help with updating and tracking game sessions.
 */
export const gameSessionService = new class GameSessionService {
  // region private variables

  private m_sendBusy: boolean = false;

  private m_pendingSendJobs: SendGameSessionJob[] = [];

  private m_trackingJobs: TrackGameSession[] = [];

  private m_trackingTimerHandle : ReturnType<typeof setTimeout> | null = null;

  // endregion

  // private methods

  /**
   * Sends the data to the server. If there is a pending job, it will be executed after the current
   * job is finished with a small delay in between.
   */
  private sendToServer(shareCode: string, session: GameSessionModel) {
    this.m_sendBusy = true;
    apiService
      .updateGameSession(shareCode, session.data, session.finished)
      .finally(() => {
        setTimeout(
          () => {
            if (this.m_pendingSendJobs.length > 0) {
              const {code, session} = this.m_pendingSendJobs.shift()!;
              this.sendToServer(code, session);
            }
            else {
              this.m_sendBusy = false;
            }
          },
          SEND_DELAY
        )
      });
  }

  /**
   * Gets the session data for all tracked gaming sessions and update the stores if any.
   *
   * Stops tracking sessions that have finished.
   */
  private async checkTrackingJobs() {
    for (const tracking of this.m_trackingJobs) {
      const {code, sequence, store} = tracking;
      const session = await apiService.getGameSession(code, sequence);
      if (session !== false) {
        tracking.sequence = session.sequence;
        store.getState().setData(session.data);
        // stop tracking finished gaming sessions automatically
        if (session.finished) {
          this.stopTracking(code);
        }
      }
    }
    // restart timer if there are any jobs left
    if (this.m_trackingJobs.length > 0) {
      this.m_trackingTimerHandle = setTimeout(
        () => this.checkTrackingJobs(), CHECK_INTERVAL
      );
    }
    else {
      this.m_trackingTimerHandle = null;
    }
  }

  // endregion

  // region public methods

  /**
   * Sends a game session to the server in the background; the method will return immediately.
   */
  send(shareCode: string, session: GameSessionModel) {
    if (this.m_sendBusy) {
      // make sure only job per share code exists (any previous session data is no longer relevant)
      const index = this.m_pendingSendJobs.findIndex(job => job.code === shareCode);
      if (index >= 0) {
        this.m_pendingSendJobs.splice(index, 1);
      }
      this.m_pendingSendJobs.push({
        code: shareCode,
        session: session,
      });
    }
    else {
      this.sendToServer(shareCode, session);
    }
  }

  /**
   * Starts tracking game session changes and update the store if there are any. If a tracked
   * game session has finished, tracking will be stopped automatically.
   */
  startTracking(shareCode: string, sequence: number, store: UseBoundStore<StoreApi<StorableGameActions>>) {
    const index = this.m_trackingJobs.findIndex(tracking => tracking.code === shareCode);
    if (index >= 0) {
      this.m_trackingJobs.splice(index, 1);
    }
    console.log('Start tracking for: ' + shareCode);
    this.m_trackingJobs.push({
      code: shareCode,
      sequence: sequence,
      store: store,
    });
    if (this.m_trackingTimerHandle === null) {
      // use setTimeout and not setInterval in case tracking IO takes too long and would overlap
      // with the next interval call
      this.m_trackingTimerHandle = setTimeout(
        () => this.checkTrackingJobs(),
        CHECK_INTERVAL
      );
    }
  }

  /**
   * Stops tracking game session changes for a certain share code.
   */
  stopTracking(shareCode: string): void {
    const index = this.m_trackingJobs.findIndex(tracking => tracking.code === shareCode);
    if (index >= 0) {
      console.log('Stopping tracking for: ' + shareCode);
      this.m_trackingJobs.splice(index, 1);
      if ((this.m_trackingJobs.length === 0) && (this.m_trackingTimerHandle !== null)) {
        clearTimeout(this.m_trackingTimerHandle);
        this.m_trackingTimerHandle = null;
      }
    }
    else {
      console.error('Can not find tracking for: ' + shareCode);
    }
  }

  // endregion
};

// endregion