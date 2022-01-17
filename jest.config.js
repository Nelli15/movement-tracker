module.exports = {presets: ['@babel/preset-env']}
module.exports = {
  globals: {
    __DEV__: true
  },
  automock: false,
  // setupFilesAfterEnv: ['<rootDir>/test/jest/jest.setup.js'],
  // noStackTrace: true,
  // bail: true,
  // cache: false,
  // verbose: true,
  // watch: true,
  collectCoverage: false,
  coverageDirectory: '<rootDir>/test/jest/coverage',
  collectCoverageFrom: [
    // '<rootDir>/src/**/*.vue',
    '<rootDir>/functions/src/**/*.js',
    '<rootDir>/functions/src/**/*.ts',
    '<rootDir>/functions/src/**/*.jsx'
  ],
  coverageThreshold: {
    global: {
      //  branches: 50,
      //  functions: 50,
      //  lines: 50,
      //  statements: 50
    }
  },
  testMatch: [
    // '<rootDir>/test/jest/__tests__/**/*.spec.js',
    // '<rootDir>/test/jest/__tests__/**/*.test.js',
    // '<rootDir>/src/**/__tests__/*_jest.spec.js',
    '<rootDir>/functions/src/**/__tests__/*_jest.spec.js',
    // '<rootDir>/functions/test/firebaseFunctions.test.js',
    // '<rootDir>/functions/**/__tests__/*_jest.spec.js'
    '<rootDir>/**/*_jest.spec.js'
  ],
  moduleFileExtensions: [
    // 'vue',
    'js',
    'jsx',
    'json',
    'ts',
    // 'tsx'
  ],
  moduleNameMapper: {
    '^vue$': '<rootDir>/node_modules/vue/dist/vue.common.js',
    '^test-utils$':
      '<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.js',
    '^quasar$': '<rootDir>/node_modules/quasar/dist/quasar.common.js',
    '^~/(.*)$': '<rootDir>/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '.*css$': '<rootDir>/test/jest/utils/stub.css'
  },
  transform: {
    // '.*\\.vue$': 'vue-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
    // '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
    //   'jest-transform-stub'
    // use these if NPM is being flaky
    // '.*\\.vue$': '<rootDir>/node_modules/@quasar/quasar-app-extension-testing-unit-jest/node_modules/vue-jest',
    // '.*\\.js$':
    //   '<rootDir>/node_modules/@quasar/quasar-app-extension-testing-unit-jest/node_modules/babel-jest'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!quasar/lang)',
    'node_modules/(?!(quasar|quasar/*|@quasar|@quasar/*))'
  ],
  // snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue']
}
