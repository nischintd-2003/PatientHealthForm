import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function handleThemeToggle() {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  return (
    <div className="theme-toggle-row">
      <button className="theme-toggle" onClick={handleThemeToggle}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
