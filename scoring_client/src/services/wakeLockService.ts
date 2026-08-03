// region local

/**
 * Prevent the mobile screen going idle.
 */
class WakeLockService {
  // region private variables

  private m_wakeLock: WakeLockSentinel | null = null;

  private m_isEnabled: boolean = false;

  // endregion

  // region public methods

  constructor() {
    // automatically re-acquire the lock if the user returns to the tab
    document.addEventListener('visibilitychange', () => {
      if ((document.visibilityState === 'visible') && this.m_isEnabled) {
        // noinspection JSIgnoredPromiseFromCall
        this.request();
      }
    });
  }

  /**
   * Check if the Screen Wake Lock API is supported by the browser.
   */
  public isSupported(): boolean {
    return 'wakeLock' in navigator;
  }

  /**
   * Request a screen wake lock.
   */
  public async request(): Promise<boolean> {
    if (!this.isSupported()) {
      console.warn('Screen Wake Lock API is not supported in this browser.');
      return false;
    }
    if (this.m_isEnabled) {
      return true;
    }
    try {
      this.m_wakeLock = await navigator.wakeLock.request('screen');
      this.m_isEnabled = true;
      this.m_wakeLock.addEventListener('release', this.handleRelease);
      return true;
    } catch (err) {
      // browsers can refuse the request if battery is low or power-saving mode is on
      console.error(`Failed to acquire Wake Lock: ${(err as Error).name} - ${(err as Error).message}`);
      return false;
    }
  }

  /**
   * Manually release the wake lock when no longer needed.
   */
  public async release(): Promise<void> {
    if (!this.m_isEnabled) {
      return;
    }
    this.m_isEnabled = false;
    if (this.m_wakeLock) {
      await this.m_wakeLock.release();
      this.deleteWakeLock();
    }
  }

  // endregion

  // region private methods

  private deleteWakeLock() {
    if (this.m_wakeLock) {
      this.m_wakeLock.removeEventListener('release', this.handleRelease);
      this.m_wakeLock = null;
    }
  }
  // endregion

  // region event handlers

  private handleRelease = () => {
    console.debug('Wake Lock was released');
    this.m_isEnabled = false;
    this.deleteWakeLock();
  };
}

// endregion

// region exports

export const wakeLockService = new WakeLockService();

// endregion