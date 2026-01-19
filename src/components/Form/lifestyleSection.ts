import { createElement } from '../../utils/dom';
import type { LocalFormState } from '../../types';
import { createCard, createSelectGroup, createInputGroup } from '../../utils/formUtils';

export function lifestyleSection(state: LocalFormState): HTMLElement {
  const card = createCard('Lifestyle', 'ri-run-line');
  const row = createElement('div', 'row');

  const exGroup = createElement('div', 'form-group col');
  exGroup.id = 'exerciseFrequency';
  exGroup.innerHTML = '<label class="required">Exercise Frequency</label>';
  const tileGroup = createElement('div', 'tile-group');

  ['Never', 'Occasionally', 'Regularly', 'Daily'].forEach((opt) => {
    const label = createElement('label', 'tile-option');
    const input = createElement('input');
    input.type = 'radio';
    input.name = 'exercise';
    input.value = opt;

    input.onchange = () => (state.exerciseFrequency = opt);

    const span = createElement('span', '', opt);
    label.appendChild(input);
    label.appendChild(span);
    tileGroup.appendChild(label);
  });

  const exError = createElement('small', 'error-msg');
  exGroup.appendChild(tileGroup);
  exGroup.appendChild(exError);
  row.appendChild(exGroup);

  const colRight = createElement('div', 'col');
  colRight.appendChild(createInputGroup('Sleep Hours/Night', 'number', 'sleepHours', state, '7'));
  colRight.appendChild(
    createSelectGroup('Diet Type', ['Standard', 'Vegetarian', 'Vegan', 'Keto'], 'dietType', state),
  );
  row.appendChild(colRight);

  card.appendChild(row);
  return card;
}
