import { createElement } from '../utils/dom';
import type { LocalFormState } from '../types';
import { personalSection } from './Form/personalSection';
import { vitalsSection } from './Form/vitalsSection';
import { medicalHistorySection } from './Form/medicalHistorySection';
import { lifestyleSection } from './Form/lifestyleSection';
import type { Patient } from '../types';
import { validatePatient } from '../validationService';
import { addPatient } from '../appState';

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
  privacyInput.id = 'privacyPolicy';
  privacyInput.onchange = (e) => (state.privacyPolicy = (e.target as HTMLInputElement).checked);

  privacyLabel.appendChild(privacyInput);
  privacyLabel.append(' I agree to the privacy policy.');
  privacyGroup.appendChild(privacyLabel);
  privacyGroup.appendChild(createElement('small', 'error-msg'));

  const submitBtn = createElement('button', 'btn-submit');
  submitBtn.innerHTML = 'Submit Assessment <i class="ri-send-plane-fill"></i>';
  submitBtn.type = 'button';
  submitBtn.onclick = handleSubmission;

  footer.appendChild(privacyGroup);
  footer.appendChild(submitBtn);
  form.appendChild(footer);

  container.appendChild(form);

  function handleSubmission() {
    clearErrors();

    const patientData: Patient = {
      id: crypto.randomUUID(),
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

    if (!state.privacyPolicy) {
      validation.isValid = false;
      validation.errors['privacyPolicy'] = 'You must agree to the privacy policy.';
    }

    if (!validation.isValid) {
      showErrors(validation.errors);
      return;
    }

    addPatient(patientData);
    alert('Patient added successfully!');
  }

  function showErrors(errors: Record<string, string>): void {
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

  function clearErrors(): void {
    container.querySelectorAll('.form-group.error').forEach((el) => el.classList.remove('error'));
    container.querySelectorAll('.error-msg').forEach((el) => (el.textContent = ''));
  }

  return container;
}
