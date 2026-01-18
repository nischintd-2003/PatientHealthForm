import { createElement } from '../utils/dom';
import type { LocalFormState } from '../types';
import { personalSection } from './Form/personalSection';
import { vitalsSection } from './Form/vitalsSection';
import { medicalHistorySection } from './Form/medicalHistorySection';

export function Form(): HTMLElement {
  const container = createElement('div', 'form-container');

  const state: LocalFormState = {
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

  const form = createElement('form');
  form.id = 'healthForm';
  form.noValidate = true;

  form.appendChild(personalSection(state));
  form.appendChild(vitalsSection(state));
  form.append(medicalHistorySection(state));

  container.appendChild(form);
  return container;
}
