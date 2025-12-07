import { includeIgnoreFile } from '@eslint/compat';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { fileURLToPath } from 'node:url';

export default defineConfig([
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.webextensions,
        bootstrap: 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
]);
