import { App } from './components/app';
import { eventBus } from './eventBus';

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
