import pluginJs from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist/']),
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
]);
