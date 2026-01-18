import { createElement } from '../utils/dom';
import type { LocalFormState } from '../types';
import { personalSection } from './Form/personalSection';
import { vitalsSection } from './Form/vitalsSection';
import { medicalHistorySection } from './Form/medicalHistorySection';
import { lifestyleSection } from './Form/lifestyleSection';

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
  form.append(lifestyleSection(state));

  const footer = createElement('div', 'footer-actions');
  const privacyGroup = createElement('div', 'form-group');

  const privacyLabel = createElement('label', 'check-box required');
  const privacyInput = createElement('input');
  privacyInput.type = 'checkbox';
  privacyInput.onchange = (e) => (state.privacyPolicy = (e.target as HTMLInputElement).checked);

  privacyLabel.appendChild(privacyInput);
  privacyLabel.append(' I agree to the privacy policy.');
  privacyGroup.appendChild(privacyLabel);
  privacyGroup.appendChild(createElement('small', 'error-msg'));

  const submitBtn = createElement('button', 'btn-submit');
  submitBtn.innerHTML = 'Submit Assessment <i class="ri-send-plane-fill"></i>';
  submitBtn.type = 'button';

  footer.appendChild(privacyGroup);
  footer.appendChild(submitBtn);
  form.appendChild(footer);

  container.appendChild(form);
  return container;
}
