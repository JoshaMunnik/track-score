import {beforeEach, describe, expect, it, vi} from 'vitest';

import type {StorableGameActions} from '../../storable/StorableGameStore.ts';
import {createSharableGameStore} from '../createSharableGameStore.ts';
import type {ZustandStore} from '../../../types/store/ZustandStore.ts';

// Mock data store is used as the second argument to createSharableGameStore.
function createMockDataStore(): ZustandStore<StorableGameActions> {
  return vi.fn() as unknown as ZustandStore<StorableGameActions>;
}

describe('createSharableGameStore', () => {
  let dataStore: ZustandStore<StorableGameActions>;

  beforeEach(() => {
    vi.clearAllMocks();
    dataStore = createMockDataStore();
  });

  describe('initial state', () => {
    it('has the expected initial state with empty shareCode and viewing=false', () => {
      const store = createSharableGameStore('test', dataStore);

      expect(store.getState()).toMatchObject({
        shareCode: '',
        viewing: false,
      });
    });
  });

  describe('setShareCode', () => {
    it('sets the share code and sets viewing to false', () => {
      const store = createSharableGameStore('test', dataStore);

      store.getState().setShareCode('ABC123');

      expect(store.getState()).toMatchObject({
        shareCode: 'ABC123',
        viewing: false,
      });
    });

    it('updates the share code when called again', () => {
      const store = createSharableGameStore('test', dataStore);

      store.getState().setShareCode('AAA');
      store.getState().setShareCode('BBB');

      expect(store.getState()).toMatchObject({
        shareCode: 'BBB',
        viewing: false,
      });
    });

    it('sets viewing to false even when previously in viewing mode', () => {
      const store = createSharableGameStore('test', dataStore);

      // Simulate being in viewing mode first.
      store.getState().setViewingCode('OLD');
      expect(store.getState().viewing).toBe(true);

      store.getState().setShareCode('NEW');

      expect(store.getState()).toMatchObject({
        shareCode: 'NEW',
        viewing: false,
      });
    });
  });

  describe('setViewingCode', () => {
    it('sets the share code and sets viewing to true', () => {
      const store = createSharableGameStore('test', dataStore);

      store.getState().setViewingCode('VIEW1');

      expect(store.getState()).toMatchObject({
        shareCode: 'VIEW1',
        viewing: true,
      });
    });

    it('updates the share code when called again', () => {
      const store = createSharableGameStore('test', dataStore);

      store.getState().setViewingCode('AAA');
      store.getState().setViewingCode('BBB');

      expect(store.getState()).toMatchObject({
        shareCode: 'BBB',
        viewing: true,
      });
    });

    it('sets viewing to true even when previously sharing', () => {
      const store = createSharableGameStore('test', dataStore);

      // Simulate being in sharing mode first.
      store.getState().setShareCode('OLD');
      expect(store.getState().viewing).toBe(false);

      store.getState().setViewingCode('NEW');

      expect(store.getState()).toMatchObject({
        shareCode: 'NEW',
        viewing: true,
      });
    });
  });

  describe('stopSharing', () => {
    it('resets the state to initial values (empty shareCode and viewing=false)', () => {
      const store = createSharableGameStore('test', dataStore);

      store.getState().setShareCode('ABC123');
      expect(store.getState().viewing).toBe(false);

      store.getState().stopSharing();

      expect(store.getState()).toMatchObject({
        shareCode: '',
        viewing: false,
      });
    });

    it('resets to initial state even when in viewing mode', () => {
      const store = createSharableGameStore('test', dataStore);

      store.getState().setViewingCode('VIEW1');
      expect(store.getState().viewing).toBe(true);

      store.getState().stopSharing();

      expect(store.getState()).toMatchObject({
        shareCode: '',
        viewing: false,
      });
    });
  });

  describe('getDataStore', () => {
    it('returns the data store passed to createSharableGameStore', () => {
      const store = createSharableGameStore('test', dataStore);

      expect(store.getState().getGameStore()).toBe(dataStore);
    });

    it('returns the same instance on repeated calls', () => {
      const store = createSharableGameStore('test', dataStore);

      expect(store.getState().getGameStore()).toBe(store.getState().getGameStore());
    });
  });

  describe('action interaction', () => {
    it('setViewingCode followed by setShareCode toggles viewing off', () => {
      const store = createSharableGameStore('test', dataStore);

      store.getState().setViewingCode('VIEW1');
      expect(store.getState().viewing).toBe(true);

      store.getState().setShareCode('SHARE1');
      expect(store.getState().viewing).toBe(false);
    });

    it('stopSharing clears any previously set share code', () => {
      const store = createSharableGameStore('test', dataStore);

      store.getState().setViewingCode('VIEW1');
      store.getState().stopSharing();

      expect(store.getState().shareCode).toBe('');
      expect(store.getState().viewing).toBe(false);
    });
  });
});
