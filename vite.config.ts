import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },

    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          isolate: false,
          include: ['src/**/*.spec.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          include: ['src/**/*.e2e-spec.ts'],
          environment:
            './prisma/vitest-environment-prisma/prisma-test-environment.ts',
          fileParallelism: false,
        },
      },
    ],
  },
})
