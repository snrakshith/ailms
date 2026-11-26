import tsparser from '@typescript-eslint/parser';
import tsplugin from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
export default [{ files:['src/**/*.{ts,tsx}'], languageOptions:{parser:tsparser,parserOptions:{ecmaFeatures:{jsx:true},sourceType:'module'}}, plugins:{'@typescript-eslint':tsplugin,'react-hooks':reactHooks}, rules:{...reactHooks.configs.recommended.rules} },{ignores:['dist/**']}];
