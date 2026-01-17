import type { Patient } from './types';

interface AppState {
  patients: Patient[];
}

const state: AppState = {
  patients: [],
};

export function getState(): AppState {
  return state;
}
