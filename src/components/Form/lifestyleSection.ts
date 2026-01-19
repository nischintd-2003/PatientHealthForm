import { createElement } from '../../utils/dom';
import type { LocalFormState } from '../../interface/formStateType';
import { createCard, createSelectGroup, createInputGroup } from '../../utils/formUtils';
import { dietType, exerciseFrequencyConst } from '../../constants';

export function lifestyleSection(state: LocalFormState): HTMLElement {
  const card = createCard('Lifestyle', 'ri-run-line');
  const row = createElement('div', 'row');

  const exGroup = createElement('div', 'form-group col');
  exGroup.id = 'exerciseFrequency';
  const exGroupLabel = createElement('label', 'required', 'Exercise Frequency');
  const tileGroup = createElement('div', 'tile-group');

  const exError = createElement('small', 'error-msg');

  exerciseFrequencyConst.forEach((opt) => {
    const label = createElement('label', 'tile-option');
    const input = createElement('input');
    input.type = 'radio';
    input.name = 'exercise';
    input.value = opt;

    if (state.exerciseFrequency === opt) {
      input.checked = true;
    }

    input.onchange = (): void => {
      state.exerciseFrequency = opt;
      exGroup.classList.remove('error');
      exGroup.querySelector('.error-msg')!.textContent = '';
    };

    const span = createElement('span', '', opt);
    label.appendChild(input);
    label.appendChild(span);
    tileGroup.appendChild(label);
  });

  exGroup.appendChild(exGroupLabel);
  exGroup.appendChild(tileGroup);
  exGroup.appendChild(exError);
  row.appendChild(exGroup);

  const colRight = createElement('div', 'col');
  colRight.appendChild(
    createInputGroup('Sleep Hours/Night', 'number', 'sleepHours', state, '7', false, 'col', 0, 24),
  );
  colRight.appendChild(createSelectGroup('Diet Type', dietType, 'dietType', state));
  row.appendChild(colRight);

  card.appendChild(row);
  return card;
}
