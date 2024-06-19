const env = 'chrome';
// const env = 'edge';
// const env = 'firefox';

// get value for specific env
// eslint-disable-next-line no-unused-vars
function getValueForEnv(forChrome, forEdge, forFireFox) {
  switch (env) {
    case 'chrome':
      return forChrome;
    case 'edge':
      return forEdge;
    case 'firefox':
    default:
      return forFireFox;
  }
}

// browser extensions API namespace
// eslint-disable-next-line no-unused-vars
const api = chrome ?? browser;

// follow system's color mode
(() => {
  'use strict';

  const setTheme = (isDark) => {
    document.documentElement.setAttribute(
      'data-bs-theme',
      isDark ? 'dark' : 'light',
    );
  };

  setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      setTheme(e.matches);
    });
})();
