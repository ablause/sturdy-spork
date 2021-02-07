const { workspaces } = require('./package.json')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: ['./packages/cli', './packages/client', './packages/server'],
};