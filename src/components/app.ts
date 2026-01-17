import { getState } from '../appState';
import { createElement } from '../utils/dom';

export function App(): HTMLDivElement {
  const root = createElement('div', 'app-root');

  const title = createElement('h2', '', 'Patient Assessment App');

  const count = createElement('p', '', `Patients count: ${getState().patients.length}`);

  root.appendChild(title);
  root.appendChild(count);

  return root;
}
