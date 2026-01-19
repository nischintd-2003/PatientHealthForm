import { eventBus } from './eventBus';
import type { Patient } from './interface/patientType';
import type { AppState } from './interface/appStateType';

const savedData = localStorage.getItem('patients');
const initialPatients = savedData ? JSON.parse(savedData) : [];

const state: AppState = {
  patients: initialPatients,
  editingId: null,
};

export function getState(): AppState {
  return { ...state };
}

export function setEditingId(id: string | null): void {
  state.editingId = id;
  eventBus.publish();
}

function save(): void {
  localStorage.setItem('patients', JSON.stringify(state.patients));
  eventBus.publish();
}

export function addPatient(patient: Patient): void {
  state.patients.push(patient);
  save();
}

export function deletePatient(id: string): void {
  if (state.editingId === id) {
    state.editingId = null;
  }
  state.patients = state.patients.filter((p) => p.id !== id);
  save();
}

export function updatePatient(id: string, updates: Partial<Patient>): void {
  const index = state.patients.findIndex((p) => p.id === id);
  if (index !== -1) {
    state.patients[index] = { ...state.patients[index], ...updates };
    state.editingId = null;
    save();
  }
}
