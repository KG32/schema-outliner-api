module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  // 'parser': 'babel-int',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  ecmaFeatures: {
    modules: true,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'max-len': 'off',
    'import/no-cycle': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'no-restricted-syntax': ['error', 'WithStatement', 'BinaryExpression[operator=\'in\']'],
    '@typescript-eslint/comma-dangle': 'off',
    'no-await-in-loop': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
