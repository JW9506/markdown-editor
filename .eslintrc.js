module.exports = {
  root: true,
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules', 'out', 'dist', 'js-out'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['prettier', '@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-extra-semi': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
}
