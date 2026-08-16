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

describe('apiService - real i/o', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // mock store
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
    it('should return a share code on success', async () => {
      const result = await apiService.getShareCode(GameType.Wizard, '');
      expect(result).not.toBe('');
    });
  });

  describe('getGameSession', () => {
    it('should return game session data on success and manage store state', async () => {
      const shareCode = await apiService.getShareCode(GameType.Wizard, '');
      await apiService.updateGameSession(shareCode, 'test', false);
      const result = await apiService.getGameSession(shareCode);

      expect(result).not.toBe(false);
      expect(result).toEqual(expect.objectContaining({
        type: GameType.Wizard,
        data: 'test',
        finished: 0,
      }));
      expect(result).toHaveProperty('sequence');
      expect(useMainStore.getState().startRetrievingGameSession).toHaveBeenCalled();
      expect(useMainStore.getState().stopRetrievingGameSession).toHaveBeenCalled();
    });

    it('should return false on failure and manage store state', async () => {
      const result = await apiService.getGameSession('CODE', 1);
      expect(result).toBe(false);
      expect(useMainStore.getState().startRetrievingGameSession).toHaveBeenCalled();
      expect(useMainStore.getState().stopRetrievingGameSession).toHaveBeenCalled();
    });
  });

  describe('updateGameSession', () => {
    it('should send updated data on success and manage store state', async () => {
      const shareCode = await apiService.getShareCode(GameType.Wizard, '');
      await apiService.updateGameSession(shareCode, 'test', false);
      expect(useMainStore.getState().startSendingGameSession).toHaveBeenCalled();
      expect(useMainStore.getState().stopSendingGameSession).toHaveBeenCalled();
    });

    it('should throw an error on invalid code', async () => {
      await expect(apiService.updateGameSession('CODE', 'test', false))
        .rejects
        .toThrow();
    });
  });
});
