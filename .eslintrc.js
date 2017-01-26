module.exports = {
  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },

  env: {
    browser: true,
    es6: true,
  },

  plugins: ['react'],

  extends: ['eslint:recommended', 'plugin:react/recommended'],

  rules: {
    'no-process-env': 'off',
  },
}

// vim: set ts=2 sw=2 et:
