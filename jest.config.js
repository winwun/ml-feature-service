module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverageFrom: ['**/__tests__/**/*.test.js'],
  collectCoverage: true,
  verbose: true,
  transform: {
    '^.+\\.js?$': require.resolve('babel-jest'),
  },
  testRunner: 'jest-circus/runner',
};
