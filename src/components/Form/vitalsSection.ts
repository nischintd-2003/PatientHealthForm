import { createElement } from '../../utils/dom';
import type { LocalFormState } from '../../types';
import { createCard, createInputGroup, createSelectGroup } from '../../utils/formUtils';

export function vitalsSection(state: LocalFormState): HTMLElement {
  const card = createCard('Vital Stats', 'ri-computer-line');

  const row1 = createElement('div', 'row');
  row1.appendChild(
    createInputGroup('Height (cm)', 'number', 'height', state, '175', true, 'col-third'),
  );
  row1.appendChild(
    createInputGroup('Weight (kg)', 'number', 'weight', state, '70', true, 'col-third'),
  );
  row1.appendChild(
    createSelectGroup(
      'Blood Type',
      ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      'bloodType',
      state,
      true,
      'col-third',
    ),
  );

  const row2 = createElement('div', 'row');
  row2.appendChild(
    createInputGroup('Blood Pressure', 'text', 'bloodPressure', state, 'e.g. 120/80'),
  );
  row2.appendChild(createInputGroup('Body Temp (°C)', 'number', 'bodyTemperature', state, '36.5'));

  card.appendChild(row1);
  card.appendChild(row2);
  return card;
}
