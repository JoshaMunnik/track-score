import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import type {UseBoundStore} from 'zustand/react';
import type {StoreApi} from 'zustand/vanilla';
import {GameType} from '../../types/enums/GameType.ts';
import type {GameSessionModel} from '../../types/models/GameSessionModel.ts';
import type {StorableGameActions} from '../../store/storable/StorableGameStore.ts';
import {apiService} from '../apiService.ts';
import {gameSessionService} from '../gameSessionService.ts';

vi.mock('../apiService.ts', () => ({
  apiService: {
    getGameSession: vi.fn(),
    updateGameSession: vi.fn(),
  },
}));

const createSession = (data: string, finished = false): GameSessionModel => ({
  id: 'session-id',
  type: GameType.Wizard,
  date: 0,
  finished: finished,
  summary: 'summary',
  data: data,
});

const createStore = () => {
  const setData = vi.fn();
  const store = {
    getState: vi.fn(() => ({
      setData: setData,
    })),
  } as unknown as UseBoundStore<StoreApi<StorableGameActions>>;
  return {store, setData};
};

const resetGameSessionService = () => {
  const service = gameSessionService as unknown as {
    m_sendBusy: boolean;
    m_pendingSendJobs: [];
    m_trackingJobs: [];
    m_trackingTimerHandle: ReturnType<typeof setTimeout> | null;
  };
  if (service.m_trackingTimerHandle !== null) {
    clearTimeout(service.m_trackingTimerHandle);
  }
  service.m_sendBusy = false;
  service.m_pendingSendJobs = [];
  service.m_trackingJobs = [];
  service.m_trackingTimerHandle = null;
};

describe('gameSessionService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resetGameSessionService();
    vi.clearAllMocks();
    vi.mocked(apiService.updateGameSession).mockResolvedValue();
    vi.mocked(apiService.getGameSession).mockResolvedValue(false);
  });

  afterEach(() => {
    resetGameSessionService();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('send', () => {
    it('sends the first session immediately', () => {
      gameSessionService.send('CODE', createSession('first'));

      expect(apiService.updateGameSession).toHaveBeenCalledWith('CODE', 'first', false);
    });

    it('queues updates while a send is busy and keeps only the latest session per share code', async () => {
      gameSessionService.send('CODE', createSession('first'));
      gameSessionService.send('CODE', createSession('second'));
      gameSessionService.send('CODE', createSession('third', true));

      expect(apiService.updateGameSession).toHaveBeenCalledTimes(1);

      await vi.advanceTimersByTimeAsync(2000);

      expect(apiService.updateGameSession).toHaveBeenCalledTimes(2);
      expect(apiService.updateGameSession).toHaveBeenLastCalledWith('CODE', 'third', true);
    });

    it('sends queued jobs in order after the send delay', async () => {
      gameSessionService.send('CODE', createSession('first'));
      gameSessionService.send('OTHER', createSession('second'));
      gameSessionService.send('CODE', createSession('third'));

      await vi.advanceTimersByTimeAsync(2500);
      await vi.advanceTimersByTimeAsync(2500);

      expect(apiService.updateGameSession).toHaveBeenNthCalledWith(1, 'CODE', 'first', false);
      expect(apiService.updateGameSession).toHaveBeenNthCalledWith(2, 'OTHER', 'second', false);
      expect(apiService.updateGameSession).toHaveBeenNthCalledWith(3, 'CODE', 'third', false);
    });
  });

  describe('startTracking', () => {
    it('polls the server and updates the store when session data is available', async () => {
      const {store, setData} = createStore();
      vi.mocked(apiService.getGameSession).mockResolvedValue({
        type: GameType.Wizard,
        finished: 0,
        data: 'remote-data',
        sequence: 2,
      });

      gameSessionService.startTracking('CODE', 1, store);

      expect(apiService.getGameSession).not.toHaveBeenCalled();

      await vi.advanceTimersByTimeAsync(2500);

      expect(apiService.getGameSession).toHaveBeenCalledWith('CODE', 1);
      expect(setData).toHaveBeenCalledWith('remote-data');
    });

    it('uses the latest tracking job when tracking starts twice for the same share code', async () => {
      const first = createStore();
      const second = createStore();
      vi.mocked(apiService.getGameSession).mockResolvedValue({
        type: GameType.Wizard,
        finished: 0,
        data: 'latest-data',
        sequence: 8,
      });

      gameSessionService.startTracking('CODE', 1, first.store);
      gameSessionService.startTracking('CODE', 7, second.store);

      await vi.advanceTimersByTimeAsync(2500);

      expect(apiService.getGameSession).toHaveBeenCalledOnce();
      expect(apiService.getGameSession).toHaveBeenCalledWith('CODE', 7);
      expect(first.setData).not.toHaveBeenCalled();
      expect(second.setData).toHaveBeenCalledWith('latest-data');
    });

    it('uses the updated sequence number on the next poll', async () => {
      const {store} = createStore();
      vi.mocked(apiService.getGameSession)
        .mockResolvedValueOnce({
          type: GameType.Wizard,
          finished: 0,
          data: 'first-data',
          sequence: 4,
        })
        .mockResolvedValueOnce({
          type: GameType.Wizard,
          finished: 0,
          data: 'second-data',
          sequence: 5,
        });

      gameSessionService.startTracking('CODE', 1, store);

      await vi.advanceTimersByTimeAsync(1500);
      await vi.advanceTimersByTimeAsync(1500);

      expect(apiService.getGameSession).toHaveBeenNthCalledWith(1, 'CODE', 1);
      expect(apiService.getGameSession).toHaveBeenNthCalledWith(2, 'CODE', 4);
    });

    it('stops tracking automatically when the server marks the session as finished', async () => {
      const {store, setData} = createStore();
      vi.mocked(apiService.getGameSession).mockResolvedValue({
        type: GameType.Wizard,
        finished: 1,
        data: 'final-data',
        sequence: 3,
      });

      gameSessionService.startTracking('CODE', 1, store);

      await vi.advanceTimersByTimeAsync(2500);
      await vi.advanceTimersByTimeAsync(2500);

      expect(apiService.getGameSession).toHaveBeenCalledOnce();
      expect(setData).toHaveBeenCalledWith('final-data');
    });

    it('does not update the store when the server returns no session data', async () => {
      const {store, setData} = createStore();
      vi.mocked(apiService.getGameSession).mockResolvedValue(false);

      gameSessionService.startTracking('CODE', 1, store);

      await vi.advanceTimersByTimeAsync(2500);

      expect(apiService.getGameSession).toHaveBeenCalledWith('CODE', 1);
      expect(setData).not.toHaveBeenCalled();
    });
  });

  describe('stopTracking', () => {
    it('cancels the pending polling timer when the last tracking job is stopped', async () => {
      const {store} = createStore();

      gameSessionService.startTracking('CODE', 1, store);
      gameSessionService.stopTracking('CODE');

      await vi.advanceTimersByTimeAsync(2500);

      expect(apiService.getGameSession).not.toHaveBeenCalled();
    });
  });
});
