module.exports = {
  root: true,
  extends: ['@languist/eslint-config/web', 'plugin:@next/next/recommended'],
  ignorePatterns: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}
