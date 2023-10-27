/** @type {import('jest').Config} */
const config = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  setupFiles: ['fake-indexeddb/auto'],
};

module.exports = config;
