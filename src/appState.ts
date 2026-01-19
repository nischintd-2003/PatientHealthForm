import { eventBus } from './eventBus';
import { loadPatients } from './appStorage';
import type { AppState } from './interface/appStateType';

const state: AppState = {
  patients: loadPatients(),
  editingId: null,
};

export function getState(): AppState {
  return { ...state };
}

export function setState(newState: Partial<AppState>): void {
  Object.assign(state, newState);
  eventBus.publish();
}
