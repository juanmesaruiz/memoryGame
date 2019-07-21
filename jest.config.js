module.exports = {
  setupFiles: [
    '<rootDir>/node_modules/regenerator-runtime/runtime',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
  ],
  testEnvironment: 'jsdom',
  globals: {
    window: {},
    document: {},
  },
};
