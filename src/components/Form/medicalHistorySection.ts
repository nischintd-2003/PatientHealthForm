import { createElement } from '../../utils/dom';
import type { LocalFormState } from '../../interface/formStateType';
import { createCard } from '../../utils/formUtils';

export function medicalHistorySection(state: LocalFormState): HTMLElement {
  const card = createCard('Medical History', 'ri-health-book-line');

  const diseaseGroup = createElement('div', 'form-group');
  diseaseGroup.id = 'chronicDiseases';
  diseaseGroup.innerHTML = '<label class="required">Chronic Diseases (Select at least 1)</label>';

  const checkboxWrapper = createElement('div', 'checkbox-wrapper');
  ['None', 'Diabetes', 'Hypertension', 'Asthma', 'Other'].forEach((disease) => {
    const label = createElement('label', 'check-box');
    const input = createElement('input');
    input.type = 'checkbox';
    input.value = disease;

    if (state.chronicDiseases.includes(disease)) {
      input.checked = true;
    }

    input.onchange = () => {
      if (disease === 'None' && input.checked) {
        state.chronicDiseases = ['None'];
        checkboxWrapper.querySelectorAll('input').forEach((cb) => {
          if ((cb as HTMLInputElement).value !== 'None') {
            (cb as HTMLInputElement).checked = false;
          }
        });
      } else if (disease !== 'None') {
        state.chronicDiseases = state.chronicDiseases.filter((d) => d !== 'None');
        const noneCb = checkboxWrapper.querySelector('input[value="None"]') as HTMLInputElement;
        if (noneCb) {
          noneCb.checked = false;
        }

        if (input.checked) {
          state.chronicDiseases.push(disease);
        } else {
          state.chronicDiseases = state.chronicDiseases.filter((d) => d !== disease);
        }
      }
      diseaseGroup.classList.remove('error');
      diseaseGroup.querySelector('.error-msg')!.textContent = '';
    };

    label.appendChild(input);
    label.append(` ${disease}`);
    checkboxWrapper.appendChild(label);
  });

  const diseaseError = createElement('small', 'error-msg');
  diseaseGroup.appendChild(checkboxWrapper);
  diseaseGroup.appendChild(diseaseError);

  const row2 = createElement('div', 'row');

  const createTextarea = (label: string, key: keyof LocalFormState, placeholder: string) => {
    const wrapper = createElement('div', 'form-group col');
    const lbl = createElement('label', '', label);
    const txt = createElement('textarea');
    txt.placeholder = placeholder;

    if (state[key]) {
      txt.value = String(state[key]);
    }

    txt.oninput = (e) => ((state as any)[key] = (e.target as HTMLTextAreaElement).value);
    wrapper.appendChild(lbl);
    wrapper.appendChild(txt);
    return wrapper;
  };

  row2.appendChild(createTextarea('Current Medications', 'medications', 'List current meds...'));
  row2.appendChild(createTextarea('Allergies', 'allergies', 'e.g. Penicillin, Peanuts'));

  card.appendChild(diseaseGroup);
  card.appendChild(row2);
  return card;
}
