module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // roots: [
  //   '<rootDir>/source/' // pointing to tests directory
  // ]
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/tests/$1',
  },
  modulePathIgnorePatterns: [
    "<rootDir>/build/"
  ]
};
