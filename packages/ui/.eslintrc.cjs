module.exports = {
  root: true,
  extends: ['@languist/eslint-config/web'],
  ignorePatterns: ['tailwind.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}
