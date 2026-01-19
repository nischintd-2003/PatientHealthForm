import { createElement } from '../utils/dom';

export function themeToggle(): HTMLDivElement {
  const themeToggleRow = createElement('div', 'theme-toggle-row');
  const themeBtn = createElement('button', 'theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  themeBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
  themeBtn.onclick = (): void => {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeBtn.innerHTML = next === 'dark' ? '☀️' : '🌙';
  };
  themeToggleRow.appendChild(themeBtn);
  return themeToggleRow;
}
