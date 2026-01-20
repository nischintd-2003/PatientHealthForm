import type { Patient } from '../interface/patient-type';
import type { LocalFormState } from '../interface/form-state-type';

export function patientToForm(p: Patient): LocalFormState {
  return {
    fullName: p.fullName,
    dob: p.dob,
    email: p.email,
    phone: p.phone,
    height: p.height,
    weight: p.weight,
    bloodType: p.bloodType,
    bloodPressure: p.bloodPressure,
    bodyTemperature: p.bodyTemperature,
    chronicDiseases: p.chronicDiseases ?? [],
    medications: p.medications ?? '',
    allergies: p.allergies ?? '',
    exerciseFrequency: p.exerciseFrequency ?? '',
    sleepHours: p.sleepHours ?? null,
    dietType: p.dietType ?? 'Standard',
    privacyPolicy: true,
  };
}

export function formToPatient(form: LocalFormState, id: string | null): Patient {
  return {
    id: id ?? crypto.randomUUID(),
    fullName: form.fullName,
    dob: form.dob,
    email: form.email,
    phone: form.phone,
    height: form.height,
    weight: form.weight,
    bloodType: form.bloodType,
    bloodPressure: form.bloodPressure,
    bodyTemperature: form.bodyTemperature,
    chronicDiseases: form.chronicDiseases,
    medications: form.medications,
    allergies: form.allergies,
    exerciseFrequency: form.exerciseFrequency,
    sleepHours: form.sleepHours,
    dietType: form.dietType,
  };
}
