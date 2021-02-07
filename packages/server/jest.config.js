module.exports = {
  name: 'server',
  displayName: 'Server tests',
  rootDir: '.',
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/'],
  modulePaths: ['<rootDir>'],
  coverageDirectory: './coverage',
  moduleDirectories: ['node_modules', 'src']
};