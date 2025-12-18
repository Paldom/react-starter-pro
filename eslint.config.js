// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import nextPlugin from "@next/eslint-plugin-next";

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tanstackQuery from '@tanstack/eslint-plugin-query'

export default tseslint.config(
  { ignores: ['.next', 'node_modules', 'coverage', 'reports', 'public', '*.config.{js,ts}'] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/*.config.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@tanstack/query': tanstackQuery,
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@tanstack/query/exhaustive-deps': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: nextPlugin.configs.recommended.rules,
    settings: nextPlugin.configs.recommended.settings ?? {},
  },
  storybook.configs["flat/recommended"]
);