import { getState, setState } from './appState';
import { savePatients } from './appStorage';
import type { Patient } from './interface/patientType';

export function setEditingId(id: string | null): void {
  setState({ editingId: id });
}

export function addPatient(patient: Patient): void {
  const currentPatients = getState().patients;
  const newPatients = [...currentPatients, patient];

  setState({ patients: newPatients });
  savePatients(newPatients);
}

export function deletePatient(id: string): void {
  const { patients, editingId } = getState();

  const newEditingId = editingId === id ? null : editingId;
  const newPatients = patients.filter((p) => p.id !== id);

  setState({
    patients: newPatients,
    editingId: newEditingId,
  });

  savePatients(newPatients);
}

export function updatePatient(id: string, updates: Partial<Patient>): void {
  const { patients } = getState();

  const newPatients = patients.map((p) => (p.id === id ? { ...p, ...updates } : p));

  setState({
    patients: newPatients,
    editingId: null,
  });

  savePatients(newPatients);
}
