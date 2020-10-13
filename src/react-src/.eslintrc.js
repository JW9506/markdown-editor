module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:react-hooks/recommended'],
      rules: {
        'react-hooks/exhaustive-deps': 'off',
      },
    },
  ],
}
