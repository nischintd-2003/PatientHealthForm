import { App } from './components/app';
export function renderApp() {
  const root = document.getElementById('app');
  if (!root) {
    throw new Error('Root element #app not found');
  }

  root.innerHTML = '';
  const appElement = App();
  root.appendChild(appElement);
}
