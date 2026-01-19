import { createElement } from '../utils/dom';
import { Form } from './Form/form';
import { Table } from './table';
import { eventBus } from '../eventBus';
import { themeToggle } from './themeToggle';
import { header } from './header';

export function renderApp(): void {
  const root = document.getElementById('app');
  if (!root) {
    throw new Error('Root element #app not found');
  }

  const render = (): void => {
    root.innerHTML = '';
    const appElement = App();
    root.appendChild(appElement);
  };

  render();

  eventBus.subscribe(render);
}

export function App(): HTMLDivElement {
  const layout = createElement('div', 'app-layout');

  const mainContent = createElement('div', 'main-content');

  mainContent.appendChild(Form());
  mainContent.appendChild(Table());

  layout.appendChild(themeToggle());
  layout.appendChild(header());
  layout.appendChild(mainContent);

  return layout;
}
