import { eventBus } from './eventBus';
import { loadPatients } from './appStorage';
import type { AppState } from './interface/appStateType';
import type { Patient } from './interface/patientType';
import type { LocalFormState } from './interface/formStateType';

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

export function getInitialFormState(editingPatient: Patient | null | undefined): LocalFormState {
  if (editingPatient) {
    return {
      fullName: editingPatient.fullName,
      dob: editingPatient.dob,
      email: editingPatient.email,
      phone: editingPatient.phone,
      height: editingPatient.height,
      weight: editingPatient.weight,
      bloodType: editingPatient.bloodType,
      bloodPressure: editingPatient.bloodPressure || '',
      bodyTemperature: editingPatient.bodyTemperature,
      medications: editingPatient.medications || '',
      allergies: editingPatient.allergies || '',
      dietType: editingPatient.dietType,
      sleepHours: editingPatient.sleepHours,
      exerciseFrequency: editingPatient.exerciseFrequency,
      chronicDiseases: editingPatient.chronicDiseases,
      privacyPolicy: true,
    };
  }

  return {
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    height: null,
    weight: null,
    bloodType: '',
    bloodPressure: '',
    bodyTemperature: null,
    medications: '',
    allergies: '',
    dietType: 'Standard',
    sleepHours: null,
    exerciseFrequency: '',
    chronicDiseases: [],
    privacyPolicy: false,
  };
}
