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
  },

  plugins: ['react'],

  extends: ['eslint:recommended', 'plugin:react/recommended'],

  rules: {
    // Possible Errors
    'no-prototype-builtins'       : 'error',
    'no-template-curly-in-string' : 'error',
    'no-unsafe-negation'          : 'error',
    'valid-jsdoc'                 : 'warn',

    // Variables
    'init-declarations'    : 'warn',
    'no-catch-shadow'      : 'warn',
    'no-shadow'            : 'error',
    'no-undef-init'        : 'warn',
    'no-undefined'         : 'error',
  },
}

// vim: set ts=2 sw=2 et:
