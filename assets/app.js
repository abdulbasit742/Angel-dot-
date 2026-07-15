(() => {
  'use strict';

  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const year = document.querySelector('[data-current-year]');
  const storageKey = 'angel-dot-theme';

  const safeReadTheme = () => {
    try {
      const value = localStorage.getItem(storageKey);
      return value === 'light' || value === 'dark' ? value : 'system';
    } catch {
      return 'system';
    }
  };

  const safeStoreTheme = (theme) => {
    try {
      if (theme === 'system') localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, theme);
    } catch {
      // The visual preference remains active for this page even when storage is unavailable.
    }
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (!toggle) return;
    const isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Use system theme' : 'Use dark theme');
  };

  const initialTheme = safeReadTheme();
  applyTheme(initialTheme);

  toggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'system' : 'dark';
    applyTheme(nextTheme);
    safeStoreTheme(nextTheme);
  });

  if (year) year.textContent = String(new Date().getFullYear());
})();
