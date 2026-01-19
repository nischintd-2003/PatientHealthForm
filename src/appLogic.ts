import { getState, setState } from './appState';
import { savePatients } from './appStorage';
import type { Patient } from './interface/patientType';
import type { LocalFormState } from './interface/formStateType';
import { validatePatient } from './validationService';

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

export function handleFormSubmission(
  container: HTMLElement,
  state: LocalFormState,
  editingPatient: Patient | null | undefined,
): void {
  clearErrors(container);

  const patientData: Patient = {
    id: editingPatient ? editingPatient.id : crypto.randomUUID(),
    fullName: state.fullName,
    dob: state.dob,
    email: state.email,
    phone: state.phone,
    height: state.height,
    weight: state.weight,
    bloodType: state.bloodType,
    bloodPressure: state.bloodPressure,
    bodyTemperature: state.bodyTemperature,
    medications: state.medications,
    allergies: state.allergies,
    dietType: state.dietType,
    sleepHours: state.sleepHours,
    exerciseFrequency: state.exerciseFrequency,
    chronicDiseases: state.chronicDiseases,
  };

  const validation = validatePatient(patientData);

  if (!editingPatient && !state.privacyPolicy) {
    validation.isValid = false;
    validation.errors['privacyPolicy'] = 'You must agree to the privacy policy.';
  }

  if (!validation.isValid) {
    showErrors(validation.errors, container);
    return;
  }

  if (editingPatient) {
    updatePatient(editingPatient.id, patientData);
    alert('Patient updated!');
  } else {
    addPatient(patientData);
    alert('Patient added!');
  }
}
