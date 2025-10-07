/** @type {import('jest').Config} */
module.exports = {
  testMatch: [
    '**/tests/**/*.test.[jt]s?(x)',
    '**/tests/**/*.spec.[jt]s?(x)',
    '**/src/**/*.test.[jt]s?(x)',
    '**/src/**/*.spec.[jt]s?(x)',
  ],

  collectCoverage: true,

  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.d.ts', '!src/**/index.{js,ts}'],

  coverageDirectory: 'coverage',

  coverageReporters: ['text', 'lcov'],

  transform: {
    '^.+\\.[jt]s$': 'babel-jest',
  },

  testPathIgnorePatterns: ['/node_modules/'],
};
