import { eventBus } from './eventBus';
import type { Patient } from './types';

interface AppState {
  patients: Patient[];
}

const state: AppState = {
  patients: [],
};

export function getState(): AppState {
  return { ...state };
}

export function addPatient(patient: Patient): void {
  state.patients.push(patient);
  eventBus.publish();
}

export function deletePatient(id: string): void {
  state.patients = state.patients.filter((p) => p.id !== id);
  eventBus.publish();
}

export function updatePatient(id: string, updates: Partial<Patient>): void {
  const index = state.patients.findIndex((p) => p.id === id);
  if (index !== -1) {
    state.patients[index] = { ...state.patients[index], ...updates };
    eventBus.publish();
  }
}
