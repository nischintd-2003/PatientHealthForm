export function renderApp() {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Root element #app not found');
  }

  const layout: HTMLDivElement = document.createElement('div');
  layout.className = 'app';
}
