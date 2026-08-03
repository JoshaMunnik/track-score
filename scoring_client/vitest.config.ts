import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    maxConcurrency: 1,
    setupFiles: './src/test/setup.ts',
    include: ['./src/**/*.test.ts'],
    testTimeout: 20000,
    execArgv: [
      '--use-system-ca',
    ],
  },
});
