import { getState } from '../appState';

export function App(): HTMLDivElement {
  const layout = document.createElement('div');
  layout.className = 'app-root';

  const patients = getState().patients;

  layout.innerHTML = `
  <h2> Patient Assessment App </h2>
  <p>Patients count: ${patients.length}</p> 
  `;
  return layout;
}
