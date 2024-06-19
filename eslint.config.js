import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    ignores: ['dist/'],
  },
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
];
