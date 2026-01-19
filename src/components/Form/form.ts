import { createElement } from '../../utils/dom';
import { personalSection } from './personalSection';
import { vitalsSection } from './vitalsSection';
import { medicalHistorySection } from './medicalHistorySection';
import { lifestyleSection } from './lifestyleSection';
import { getState, getInitialFormState } from '../../appState';
import { handleFormSubmission } from '../../appLogic';

export function Form(): HTMLElement {
  const container = createElement('div', 'health-form-container');

  const globalState = getState();
  const editingPatient = globalState.editingId
    ? globalState.patients.find((p) => p.id === globalState.editingId)
    : null;

  const state = getInitialFormState(editingPatient);

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
  submitBtn.onclick = () => {
    handleFormSubmission(container, state, editingPatient);
  };

  footer.appendChild(submitBtn);
  form.appendChild(footer);

  container.appendChild(form);
  return container;
}
