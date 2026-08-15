import {beforeEach, describe, expect, it, vi} from 'vitest';

import {GameType} from '../../../types/enums/GameType.ts';
import type {GameSessionModel} from '../../../types/models/GameSessionModel.ts';
import type {PlayerModel} from '../../../types/models/PlayerModel.ts';
import {useMainStore} from '../useMainStore.ts';

function createGameSession(
  id: string,
  overrides: Partial<GameSessionModel> = {},
): GameSessionModel {
  return {
    id,
    type: GameType.DiceCatan,
    date: 1000,
    finished: false,
    summary: `Session ${id}`,
    data: '{}',
    ...overrides,
  };
}

describe('useMainStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    useMainStore.setState({
      playerNames: [],
      gameSessions: {},
      onSelectPlayerName: () => {},
      selectPlayerNameVisible: false,
      sendingGameSession: false,
      retrievingGameSession: false,
      getQrCodeVisible: false,
      sharableGameStore: null,
      firstVisitPage: false,
      useWakeLock: true,
    });
  });

  it('has the expected initial state', () => {
    expect(useMainStore.getState()).toMatchObject({
      playerNames: [],
      gameSessions: {},
      selectPlayerNameVisible: false,
      sendingGameSession: false,
      retrievingGameSession: false,
    });
  });

  it('adds trimmed player names and ignores empty names', () => {
    useMainStore.getState().addPlayerName('  Alice  ');
    useMainStore.getState().addPlayerName('   ');
    useMainStore.getState().addPlayerName('\tBob\n');

    expect(useMainStore.getState().playerNames).toEqual(['Alice', 'Bob']);
  });

  it('updates an existing player name using case-insensitive matching', () => {
    useMainStore.getState().addPlayerName('Alice');
    useMainStore.getState().addPlayerName('  ALICE  ');

    expect(useMainStore.getState().playerNames).toEqual(['ALICE']);
  });

  it('adds player names from player models', () => {
    const players: PlayerModel[] = [
      {name: ' Alice ', first: true},
      {name: '', first: false},
      {name: 'Bob', first: false},
      {name: 'alice', first: false},
    ];

    useMainStore.getState().addPlayerNames(players);

    expect(useMainStore.getState().playerNames).toEqual(['alice', 'Bob']);
  });

  it('removes all player names', () => {
    useMainStore.setState({
      playerNames: ['Alice', 'Bob'],
    });

    useMainStore.getState().removePlayerNames();

    expect(useMainStore.getState().playerNames).toEqual([]);
  });

  it('updates game sessions by id', () => {
    const firstSession = createGameSession('session-1');
    const secondSession = createGameSession('session-2', {
      type: GameType.Wizard,
      finished: true,
    });
    const updatedFirstSession = createGameSession('session-1', {
      summary: 'Updated',
      data: '{"score":10}',
    });

    useMainStore.getState().updateGameSession(firstSession);
    useMainStore.getState().updateGameSession(secondSession);
    useMainStore.getState().updateGameSession(updatedFirstSession);

    expect(useMainStore.getState().gameSessions).toEqual({
      'session-1': updatedFirstSession,
      'session-2': secondSession,
    });
  });

  it('removes a single game session by id', () => {
    const firstSession = createGameSession('session-1');
    const secondSession = createGameSession('session-2');

    useMainStore.setState({
      gameSessions: {
        'session-1': firstSession,
        'session-2': secondSession,
      },
    });

    useMainStore.getState().removeGameSession('session-1');

    expect(useMainStore.getState().gameSessions).toEqual({
      'session-2': secondSession,
    });
  });

  it('removes all game sessions', () => {
    useMainStore.setState({
      gameSessions: {
        'session-1': createGameSession('session-1'),
      },
    });

    useMainStore.getState().removeGameSessions();

    expect(useMainStore.getState().gameSessions).toEqual({});
  });

  it('shows and hides the player name selection popup', () => {
    const onSelect = vi.fn();

    useMainStore.getState().showPlayerNames(onSelect);

    expect(useMainStore.getState().selectPlayerNameVisible).toBe(true);

    useMainStore.getState().onSelectPlayerName?.('Alice');

    expect(onSelect).toHaveBeenCalledWith('Alice');

    useMainStore.getState().hidePlayerNames();

    expect(useMainStore.getState().selectPlayerNameVisible).toBe(false);
    expect(useMainStore.getState().onSelectPlayerName).toBeUndefined();
  });

  it('toggles sending and retrieving flags', () => {
    useMainStore.getState().startSendingGameSession();
    useMainStore.getState().startRetrievingGameSession();

    expect(useMainStore.getState()).toMatchObject({
      sendingGameSession: true,
      retrievingGameSession: true,
    });

    useMainStore.getState().stopSendingGameSession();
    useMainStore.getState().stopRetrievingGameSession();

    expect(useMainStore.getState()).toMatchObject({
      sendingGameSession: false,
      retrievingGameSession: false,
    });
  });

  it('resets to the initial state', () => {
    useMainStore.setState({
      playerNames: ['Alice'],
      gameSessions: {
        'session-1': createGameSession('session-1'),
      },
      onSelectPlayerName: vi.fn(),
      selectPlayerNameVisible: true,
      sendingGameSession: true,
      retrievingGameSession: true,
    });

    useMainStore.getState().reset();

    expect(useMainStore.getState()).toMatchObject({
      playerNames: [],
      gameSessions: {},
      selectPlayerNameVisible: false,
      sendingGameSession: false,
      retrievingGameSession: false,
    });
  });

  it('shows and hides QR code popup with store', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockStore = vi.fn() as any;
    
    useMainStore.getState().showGetQrCode(mockStore);

    expect(useMainStore.getState().getQrCodeVisible).toBe(true);
    expect(useMainStore.getState().sharableGameStore).toBe(mockStore);

    useMainStore.getState().hideGetQrCode();

    expect(useMainStore.getState().getQrCodeVisible).toBe(false);
    expect(useMainStore.getState().sharableGameStore).toBeNull();
  });

  it('marks first visit page as viewed', () => {
    useMainStore.getState().viewedFirstVisitPage();

    expect(useMainStore.getState().firstVisitPage).toBe(true);
  });

  it('sets wake lock usage', () => {
    useMainStore.getState().setUseWakeLock(false);

    expect(useMainStore.getState().useWakeLock).toBe(false);

    useMainStore.getState().setUseWakeLock(true);

    expect(useMainStore.getState().useWakeLock).toBe(true);
  });
});
