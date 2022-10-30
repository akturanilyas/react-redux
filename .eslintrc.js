module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
  },
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: 0,
    'import/no-import-module-exports': 0,
    'no-shadow': 'off',
    'linebreak-style': 0,
    'import/extensions': 'off',
    'import/prefer-default-export': 0,
    'no-console': 2,
    'no-return-await': 2,
    'consistent-return': 'off',
    'import/no-dynamic-require': 2,
    'global-require': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'arrow-body-style': 'off',
    'object-curly-newline': 'off',
    'no-prototype-builtins': 0,
    'max-len': [2, 150, 4],
    'strict-pro': 0,
    'newline-before-return': 2,
    yoda: 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  }
};
