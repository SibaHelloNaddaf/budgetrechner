module.exports = {
  testEnvironment: 'jsdom',

  testMatch: ['<rootDir>/tests/jest/**/*.spec.js'],

  moduleFileExtensions: ['js', 'json', 'vue'],

  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
  },

  transformIgnorePatterns: [],
}
