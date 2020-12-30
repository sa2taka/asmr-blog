module.exports = {
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'ts-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '\\.css$': '<rootDir>/tests/__mocks__/styleMock.js',
  },
  moduleFileExtensions: ['js', 'ts', 'vue'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>components/**/*.vue',
    '<rootDir>pages/**/*.vue',
    '<rootDir>libs/**/*.ts',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  snapshotSerializers: ['jest-serializer-vue'],
};
