import { createElement } from '../utils/dom';
import { Form } from './form';
import { Table } from './table';

export function App(): HTMLDivElement {
  const layout = createElement('div', 'app-layout');

  const formSection = Form();
  const tableSection = Table();

  layout.appendChild(formSection);
  layout.appendChild(tableSection);

  return layout;
}
