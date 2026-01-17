export function renderApp() {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Root element #app not found');
  }

  root.innerHTML = '';

  const layout: HTMLDivElement = document.createElement('div');
  layout.className = 'app-root';
  layout.textContent = 'Patient Assessment App';

  root.appendChild(layout);
  return layout;
}
