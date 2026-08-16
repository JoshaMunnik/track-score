import {describe, expect, it, vi} from 'vitest';
import {getClientBaseUrl, getServerApiUrl} from "../netTools.ts";

describe('netTools', () => {
  describe('getServerUrl', () => {
    it('should return the correct test server URL when running in test environment', () => {
      // Mock import.meta.env.BASE_URL to simulate test environment
      const originalEnv = import.meta.env;
      
      try {
        vi.stubGlobal('import', {
          meta: {
            env: {
              BASE_URL: '/'
            }
          }
        });
        
        const url = getServerApiUrl();
        expect(url).toBe('https://scoring2/game-session/');
      } finally {
        // Restore original
        vi.stubGlobal('import', { meta: originalEnv });
      }
    });

    it('should return a development server URL when running locally', () => {
      // Mock window.location.origin and import.meta.env.BASE_URL
      const originalWindow = window;
      const originalEnv = import.meta.env;
      
      try {
        vi.stubGlobal('window', {
          location: {
            origin: 'http://localhost:3000'
          }
        });
        
        vi.stubGlobal('import', {
          meta: {
            BASE_URL: '/client/'
          }
        });
        
        const url = getServerApiUrl();
        expect(url).toBe('https://scoring2/game-session/');
      } finally {
        // Restore originals
        vi.stubGlobal('window', originalWindow);
        vi.stubGlobal('import', { meta: originalEnv });
      }
    });

  });

  describe('getClientBaseUrl', () => {
    it('should return the correct test client URL when running in test environment', () => {
      // Mock import.meta.env.BASE_URL to simulate test environment
      const originalEnv = import.meta.env;
      
      try {
        vi.stubGlobal('import', {
          meta: {
            env: {
              BASE_URL: '/'
            }
          }
        });
        
        const url = getClientBaseUrl();
        expect(url).toBe('https://scoring2/client/');
      } finally {
        // Restore original
        vi.stubGlobal('import', { meta: originalEnv });
      }
    });
  });
});