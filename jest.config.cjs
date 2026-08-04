module.exports = {
  testEnvironment: 'jsdom',

  testMatch: ['<rootDir>/tests/jest/**/*.spec.js'],

  moduleFileExtensions: ['js', 'json', 'vue'],

  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  transformIgnorePatterns: [
    '/node_modules/(?!(?:@vue/compiler-dom|@vue/compiler-core|@vue/shared)/)',
  ],
}
