import {defineConfig, mergeConfig} from 'vitest/config';
import baseConfig from './vitest.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      setupFiles: './src/test/setup.unit.ts',
      include: ['./src/**/*.unit.test.ts'],
    },
  }),
  true
);
