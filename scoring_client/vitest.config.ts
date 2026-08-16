import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    maxConcurrency: 1,
    testTimeout: 20000,
    execArgv: [
      '--use-system-ca',
    ],
  },
});
