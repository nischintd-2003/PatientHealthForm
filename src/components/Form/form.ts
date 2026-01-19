import { createElement } from '../../utils/dom';
import type { LocalFormState } from '../../interface/formStateType';
import { personalSection } from './personalSection';
import { vitalsSection } from './vitalsSection';
import { medicalHistorySection } from './medicalHistorySection';
import { lifestyleSection } from './lifestyleSection';
import type { Patient } from '../../interface/patientType';
import { validatePatient } from '../../validationService';
import { addPatient, updatePatient, showErrors, clearErrors } from '../../appLogic';
import { getState } from '../../appState';

export function Form(): HTMLElement {
  const container = createElement('div', 'health-form-container');

  const globalState = getState();
  const editingPatient = globalState.editingId
    ? globalState.patients.find((p) => p.id === globalState.editingId)
    : null;

  const state: LocalFormState = editingPatient
    ? {
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
      }
    : {
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

  if (!editingPatient) {
    const privacyLabel = createElement('label', 'check-box required');
    const privacyInput = createElement('input');
    privacyInput.type = 'checkbox';
    privacyInput.id = 'privacyPolicy';

    privacyLabel.appendChild(privacyInput);
    privacyLabel.append(' I agree to the privacy policy.');
    privacyGroup.appendChild(privacyLabel);
    privacyGroup.appendChild(createElement('small', 'error-msg'));

    privacyInput.onchange = (e) => {
      state.privacyPolicy = (e.target as HTMLInputElement).checked;
      privacyGroup.classList.remove('error');
      privacyGroup.querySelector('.error-msg')!.textContent = '';
    };

    footer.appendChild(privacyGroup);
  }

  const submitBtn = createElement('button', 'btn-submit');
  submitBtn.innerHTML = editingPatient
    ? 'Update Patient <i class="ri-save-line"></i>'
    : 'Submit Assessment <i class="ri-send-plane-fill"></i>';
  submitBtn.type = 'button';
  submitBtn.onclick = handleSubmission;

  footer.appendChild(submitBtn);
  form.appendChild(footer);

  container.appendChild(form);

  function handleSubmission() {
    clearErrors(container);

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

  return container;
}
