import { defineConfig } from 'eslint/config'
import { includeIgnoreFile } from '@eslint/compat'
import { fileURLToPath } from 'node:url'
import globals from 'globals'
import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'

const gitignorePath = fileURLToPath(new URL('../.gitignore', import.meta.url))

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,jsx}'], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ['**/*.{js,mjs,cjs,jsx}'], plugins: { js }, extends: ['js/recommended'] },
  pluginReact.configs.flat.recommended,
  eslintPluginPrettier,
  eslintPluginReactRefresh.configs.recommended,
  eslintPluginReactHooks.configs['recommended-latest'],
  includeIgnoreFile(gitignorePath),
  { plugins: { '@stylistic': stylistic } },
  {
    rules: {
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
      ],
      'no-console': ['error', { allow: ['log', 'info', 'warn', 'error'] }],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
      '@stylistic/quote-props': ['error', 'consistent'],
      '@stylistic/type-annotation-spacing': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
])
