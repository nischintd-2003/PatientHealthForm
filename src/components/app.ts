export function App(): HTMLDivElement {
  const layout = document.createElement('div');
  layout.className = 'app-root';
  layout.textContent = 'Patient Assessment App';

  return layout;
}
