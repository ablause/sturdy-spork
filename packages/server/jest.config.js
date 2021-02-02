/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions: { paths: paths } } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(paths),
      "moduleDirectories": [
      ".",
      "src",
      "src/common",
      "node_modules"
    ]
};