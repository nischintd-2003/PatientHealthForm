import { createElement } from '../../utils/dom';
import { personalSection } from './personalSection';
import { vitalsSection } from './vitalsSection';
import { medicalHistorySection } from './medicalHistorySection';
import { lifestyleSection } from './lifestyleSection';
import { getState, getInitialFormState } from '../../appState';
import { formFooter } from './formFooter';

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
  form.appendChild(formFooter(editingPatient, state, container));

  container.appendChild(form);
  return container;
}
