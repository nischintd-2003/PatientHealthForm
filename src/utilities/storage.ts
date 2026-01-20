import type { AppState } from '../interface/app-state-type';

const STORAGE_KEY = 'health-app-state';

export function loadStateFromStorage(): AppState | null {
  try {
    const appData = localStorage.getItem(STORAGE_KEY);
    return appData ? (JSON.parse(appData) as AppState) : null;
  } catch {
    throw new Error('Error loading data');
  }
}

export function saveStateToStorage(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    throw new Error('Error saving data');
  }
}
