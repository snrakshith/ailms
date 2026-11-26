import tsparser from '@typescript-eslint/parser';
import tsplugin from '@typescript-eslint/eslint-plugin';
export default [
  {
    files: ['**/*.ts'],
    languageOptions: { parser: tsparser },
    plugins: { '@typescript-eslint': tsplugin },
    rules: { '@typescript-eslint/no-explicit-any': 'warn' },
  },
  { ignores: ['dist/**'] },
];
