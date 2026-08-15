import {afterEach, beforeEach, describe, expect, it, type Mock, vi} from 'vitest';
import {apiService} from '../apiService.ts';
import {GameType} from "../../types/enums/GameType.ts";
import {useMainStore} from '../../store/main/useMainStore.ts';

const defaultMainStoreState = useMainStore.getState();

// mock the main store, to be able to track certain action calls.
vi.mock('../../store/main/useMainStore', () => {
  const mockHook: Mock<typeof useMainStore> = vi.fn();
  mockHook.getState = vi.fn();
  return { useMainStore: mockHook };
});

describe('apiService - mock fetch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // mock environment variables and window.location
    vi.stubGlobal('import', {meta: {env: {BASE_URL: '/app/'}}});
    vi.stubGlobal('location', {origin: 'http://localhost:3000'});
     // mock fetch globally
    globalThis.fetch = vi.fn();
    vi.mocked(useMainStore.getState).mockReturnValue(({
      ...defaultMainStoreState,
      startRetrievingGameSession: vi.fn(),
      stopRetrievingGameSession: vi.fn(),
      startSendingGameSession: vi.fn(),
      stopSendingGameSession: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getShareCode', () => {
    it('should return the share code on success', async () => {
      const mockResponse = {code: 'ABC123'};
      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await apiService.getShareCode(GameType.Wizard, '');

      expect(result).toBe('ABC123');
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('game-session/create'),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({type: GameType.Wizard, data: ''})
        }
      );
    });

    it('should throw an error on failure', async () => {
      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(apiService.getShareCode(GameType.Wizard, '')).rejects.toThrow(
        'API call failed: 500 Internal Server Error'
      );
    });
  });

  describe('getGameSession', () => {
    it('should return game session data on success and manage store state', async () => {
      const mockSession = {
        type: GameType.Wizard,
        finished: false,
        data: 'test',
        sequence: 1,
      };
      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSession),
      });

      const result = await apiService.getGameSession('CODE', 1);

      expect(result).toEqual(mockSession);
      expect(useMainStore.getState).toHaveBeenCalledTimes(2);
      expect(useMainStore.getState().startRetrievingGameSession).toHaveBeenCalled();
      expect(useMainStore.getState().stopRetrievingGameSession).toHaveBeenCalled();
    });

    it('should return false on failure and manage store state', async () => {
      (globalThis.fetch as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Network Error'));

      const result = await apiService.getGameSession('CODE', 1);

      expect(result).toBe(false);
      expect(useMainStore.getState().startRetrievingGameSession).toHaveBeenCalled();
      expect(useMainStore.getState().stopRetrievingGameSession).toHaveBeenCalled();
    });
  });

  describe('updateGameSession', () => {
    it('should send updated data on success and manage store state', async () => {
      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: true,
        json: () => ({})
      });

      await apiService.updateGameSession('CODE', '{"move":"a1"}', false);

      expect(useMainStore.getState().startSendingGameSession).toHaveBeenCalled();
      expect(useMainStore.getState().stopSendingGameSession).toHaveBeenCalled();
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            code: 'CODE',
            data: '{"move":"a1"}',
            finished: 0,
          }),
        })
      );
    });

    it('should throw an error on failure', async () => {
      (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      });

      await expect(apiService.updateGameSession('CODE', '{}', false)).rejects.toThrow(
        'API call failed: 400 Bad Request'
      );
    });
  });
});

