import {describe, expect, it} from 'vitest';
import {decodeBase64, encodeBase64, getGameModule, getGameSessionId} from '../mainTools.ts';
import {GameType} from "../../types/enums/GameType.ts";

describe('mainTools', () => {
  describe('getGameModule', () => {
    it('should return a module for valid game types', () => {
      // Test that we can find at least one module (DICE should exist)
      const diceModule = getGameModule(GameType.Dice);
      expect(diceModule).not.toBeNull();
      if (diceModule) {
        expect(diceModule.type).toBe(GameType.Dice);
      }
    });

    it('should return null for invalid game types', () => {
      const result = getGameModule('UNKNOWN' as never);
      expect(result).toBeNull();
    });
  });

  describe('encodeBase64', () => {
    it('should encode a simple object to base64 string', () => {
      const data = {name: 'test', value: 123};
      const encoded = encodeBase64(data);
      expect(typeof encoded).toBe('string');
      expect(encoded).not.toBe('');
    });

    it('should handle UTF-8 characters correctly', () => {
      const data = {text: 'Hello, 世界 🌍'};
      const encoded = encodeBase64(data);
      const decoded = decodeBase64<typeof data>(encoded);
      expect(decoded).toEqual(data);
    });
  });

  describe('decodeBase64', () => {
    it('should decode a base64 string back to the original object', () => {
      const original = {name: 'test', value: 123};
      const encoded = encodeBase64(original);
      const decoded = decodeBase64<typeof original>(encoded);
      expect(decoded).toEqual(original);
    });

    it('should handle empty objects', () => {
      const original = {};
      const encoded = encodeBase64(original);
      const decoded = decodeBase64<typeof original>(encoded);
      expect(decoded).toEqual(original);
    });
  });

  describe('getGameSessionId', () => {
    it('should return a valid UUID format string', () => {
      const id = getGameSessionId();
      expect(typeof id).toBe('string');
      // Basic UUID validation (should have 36 characters with hyphens in specific positions)
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });
  });
});