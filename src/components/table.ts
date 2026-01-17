import { createElement } from '../utils/dom';
import { getState } from '../appState';

export function Table(): HTMLElement {
  const container = createElement('div', 'table-container');
  const title = createElement('h3', '', 'Patient List');
  const count = createElement('p', '', `Total Patients: ${getState().patients.length}`);
  container.appendChild(title);
  container.appendChild(count);
  return container;
}
