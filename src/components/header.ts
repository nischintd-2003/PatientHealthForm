import { createElement } from '../utils/dom';

export function header(): HTMLElement {
  const header = createElement('header', 'page-header');
  const headerIcon = createElement('div', 'logo-icon');
  headerIcon.appendChild(createElement('i', 'ri-shield-cross-fill'));
  const headerTitle = createElement('h1', '', 'Patient Health Assessment');
  const headerDescription = createElement(
    'p',
    '',
    'Please provide accurate information to help us better understand your health status.',
  );

  header.appendChild(headerIcon);
  header.appendChild(headerTitle);
  header.appendChild(headerDescription);

  return header;
}
