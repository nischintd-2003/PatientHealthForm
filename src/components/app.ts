import { createElement } from '../utils/dom';
import { Form } from './form';
import { Table } from './table';

export function App(): HTMLDivElement {
  const layout = createElement('div', 'app-layout');

  const themeToggleRow = createElement('div', 'theme-toggle-row');
  const themeBtn = createElement('button', 'theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  themeBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
  themeBtn.onclick = () => {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeBtn.innerHTML = next === 'dark' ? '☀️' : '🌙';
  };
  themeToggleRow.appendChild(themeBtn);

  const header = createElement('header', 'page-header');
  const headerIcon = createElement('div', 'logo-icon');
  headerIcon.innerHTML = '<i class="ri-shield-cross-fill"></i>';
  const headerTitle = createElement('h1', '', 'Patient Health Assessment');
  const headerDescription = createElement(
    'p',
    '',
    'Please provide accurate information to help us better understand your health status.',
  );

  header.appendChild(headerIcon);
  header.appendChild(headerTitle);
  header.appendChild(headerDescription);

  const mainContent = createElement('div', 'main-content');

  const formSection = Form();
  const tableSection = Table();

  mainContent.appendChild(formSection);
  mainContent.appendChild(tableSection);

  layout.appendChild(themeToggleRow);
  layout.appendChild(header);
  layout.appendChild(mainContent);

  return layout;
}
