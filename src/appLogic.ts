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

export function showErrors(errors: Record<string, string>, container: HTMLElement): void {
  Object.entries(errors).forEach(([key, msg]) => {
    const input = container.querySelector(`#${key}`);

    if (input) {
      const group = input.closest('.form-group');
      if (group) {
        group.classList.add('error');
        const errorSpan = group.querySelector('.error-msg');
        if (errorSpan) {
          errorSpan.textContent = msg;
        }
      }
    }
  });

  const firstError = container.querySelector('.error');
  if (firstError) {
    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

export function clearErrors(container: HTMLElement): void {
  container.querySelectorAll('.form-group.error').forEach((el) => el.classList.remove('error'));
  container.querySelectorAll('.error-msg').forEach((el) => (el.textContent = ''));
}
