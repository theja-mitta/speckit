module.exports = {
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/**/*.unit.*.(ts|tsx|js)'],
      collectCoverage: true,
      coverageDirectory: '<rootDir>/coverage/unit',
      coverageThreshold: {
        global: { branches: 80, functions: 80, lines: 80, statements: 80 }
      }
    },
    {
      displayName: 'ui',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      testMatch: ['**/__tests__/**/*.ui.*.(ts|tsx|js)'],
      collectCoverage: true,
      coverageDirectory: '<rootDir>/coverage/ui',
      coverageThreshold: {
        global: { branches: 80, functions: 80, lines: 80, statements: 80 }
      }
    }
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
