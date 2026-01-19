import { createElement } from '../../utils/dom';
import type { Patient } from '../../interface/patientType';
import type { LocalFormState } from '../../interface/formStateType';
import { handleFormSubmission } from '../../appLogic';

export function formFooter(
  editingPatient: Patient | null | undefined,
  state: LocalFormState,
  container: HTMLDivElement,
): HTMLDivElement {
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

  footer.appendChild(submitButton(editingPatient, state, container));

  return footer;
}

export function submitButton(
  editingPatient: Patient | null | undefined,
  state: LocalFormState,
  container: HTMLDivElement,
): HTMLButtonElement {
  const submitBtn = createElement('button', 'btn-submit');
  const submitText = editingPatient ? 'Update Assesment' : 'Submit Assessment';
  const submitContent = createElement('p', 'btn-submit-text', submitText);
  const submitIcon = editingPatient
    ? createElement('i', 'ri-save-line')
    : createElement('i', 'ri-send-plane-fill');

  submitBtn.appendChild(submitContent);
  submitBtn.appendChild(submitIcon);
  submitBtn.type = 'button';
  submitBtn.onclick = () => {
    handleFormSubmission(container, state, editingPatient);
  };
  return submitBtn;
}
