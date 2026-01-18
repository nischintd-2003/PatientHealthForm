import { createElement } from '../utils/dom';
import { getState } from '../appState';

export function Table(): HTMLElement {
  const container = createElement('div', 'table-container');
  const title = createElement('h3', '', 'Patient List');
  const patients = getState().patients;
  const count = createElement('p', '', `Total Patients: ${patients.length}`);

  const list = createElement('ul');

  patients.forEach((p) => {
    const item = createElement('li', '', `${p.fullName} (${p.bloodType || 'N/A'})`);
    list.appendChild(item);
  });

  container.appendChild(list);

  container.appendChild(title);
  container.appendChild(count);
  container.appendChild(list);
  return container;
}
