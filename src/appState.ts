import { eventBus } from './eventBus';
import type { Patient } from './types';

interface AppState {
  patients: Patient[];
  editingId: string | null;
}

const state: AppState = {
  patients: [],
  editingId: null,
};

export function getState(): AppState {
  return { ...state };
}

export function setEditingId(id: string | null): void {
  state.editingId = id;
  eventBus.publish();
}

export function stopEditingPatient() {
  state.editingId = null;
  eventBus.publish();
}

export function addPatient(patient: Patient): void {
  state.patients.push(patient);
  eventBus.publish();
}

export function deletePatient(id: string): void {
  if (state.editingId === id) {
    state.editingId = null;
  }
  state.patients = state.patients.filter((p) => p.id !== id);
  eventBus.publish();
}

export function updatePatient(id: string, updates: Partial<Patient>): void {
  const index = state.patients.findIndex((p) => p.id === id);
  if (index !== -1) {
    state.patients[index] = { ...state.patients[index], ...updates };
    state.editingId = null;
    eventBus.publish();
  }
}
