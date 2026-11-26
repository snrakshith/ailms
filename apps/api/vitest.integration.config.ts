import { defineConfig } from 'vitest/config';
/** Run against a disposable MongoDB instance, never against a production database. */
export default defineConfig({
  test: {
    include: ['tests/integration/**/*.test.ts'],
    environment: 'node',
    fileParallelism: false,
    testTimeout: 20000,
    hookTimeout: 30000,
  },
});
