import {defineConfig, mergeConfig} from 'vitest/config';
import baseConfig from './vitest.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      setupFiles: './src/test/setup.integration.ts',
      include: ['./src/**/*.integration.test.ts'],
    },
  })
);
