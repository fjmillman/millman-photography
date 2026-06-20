import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierConfig from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    files: ['app/**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          'checksVoidReturn': false,
        }
      ],
      'no-unused-vars': 'off',
      'import-x/no-dynamic-require': 'warn',
      'import-x/no-nodejs-modules': 'warn',
      "import-x/order": [
        "warn",
        {
          "pathGroups": [
            {
              "pattern": "~/**",
              "group": "external",
              "position": "after"
            }
          ],
          "groups": [["builtin", "external"], "internal", ["parent", "index", "sibling"]],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc"
          }
        }
      ],
    },
  },
  jsxA11y.flatConfigs.recommended,
  prettierConfig,
);
