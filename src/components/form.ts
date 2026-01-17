import { createElement } from '../utils/dom';

export function Form(): HTMLElement {
  const container = createElement('div', 'form-container');
  const title = createElement('h3', '', 'Patient Form');

  container.appendChild(title);

  return container;
}
