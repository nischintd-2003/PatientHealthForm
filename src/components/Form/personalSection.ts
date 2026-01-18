import { createElement } from '../../utils/dom';
import type { LocalFormState } from '../../types';
import { createCard, createInputGroup } from '../../utils/formUtils';

export function personalSection(state: LocalFormState): HTMLElement {
  const card = createCard('Personal Information', 'ri-user-heart-line');

  const row1 = createElement('div', 'row');
  row1.appendChild(createInputGroup('Full Name', 'text', 'fullName', state, 'John Doe', true));
  row1.appendChild(createInputGroup('Date of Birth (18+)', 'date', 'dob', state, '', true));

  const row2 = createElement('div', 'row');
  row2.appendChild(
    createInputGroup('Email Address', 'email', 'email', state, 'john@example.com', true),
  );
  row2.appendChild(createInputGroup('Phone Number', 'tel', 'phone', state, '1234567890', true));

  card.appendChild(row1);
  card.appendChild(row2);
  return card;
}
