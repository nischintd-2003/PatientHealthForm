import { createElement } from './dom';
import type { LocalFormState } from '../types';

export const createCard = (title: string, iconClass: string): HTMLElement => {
  const card = createElement('section', 'form-card');
  const header = createElement('div', 'card-header');

  const icon = createElement('i', iconClass);
  const titleEl = createElement('h3', '', title);

  header.appendChild(icon);
  header.appendChild(titleEl);
  card.appendChild(header);
  return card;
};

export const createInputGroup = (
  label: string,
  type: string,
  key: keyof LocalFormState,
  state: LocalFormState,
  placeholder: string = '',
  isRequired: boolean = false,
  colClass: string = 'col',
): HTMLElement => {
  const wrapper = createElement('div', `form-group ${colClass}`);

  const lbl = createElement('label', isRequired ? 'required' : '', label);
  lbl.setAttribute('for', key);

  const input = createElement('input') as HTMLInputElement;
  input.type = type;
  input.id = key;
  input.placeholder = placeholder;

  if (state[key] !== null && state[key] !== undefined) {
    input.value = String(state[key]);
  }

  input.oninput = (e) => {
    const val = (e.target as HTMLInputElement).value;
    if (type === 'number') {
      (state as any)[key] = val ? parseFloat(val) : null;
    } else {
      (state as any)[key] = val;
    }
  };

  const error = createElement('small', 'error-msg');

  wrapper.appendChild(lbl);
  wrapper.appendChild(input);
  wrapper.appendChild(error);
  return wrapper;
};

export const createSelectGroup = (
  label: string,
  options: string[],
  key: keyof LocalFormState,
  state: LocalFormState,
  isRequired: boolean = false,
  colClass: string = 'col',
): HTMLElement => {
  const wrapper = createElement('div', `form-group ${colClass}`);
  const lbl = createElement('label', isRequired ? 'required' : '', label);

  const select = createElement('select') as HTMLSelectElement;
  select.id = key;

  const placeholderOpt = createElement('option', '', `Select ${label}`);
  placeholderOpt.value = '';
  select.appendChild(placeholderOpt);

  options.forEach((opt) => {
    const option = createElement('option', '', opt);
    option.value = opt;
    if (state[key] === opt) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  select.onchange = (e) => {
    (state as any)[key] = (e.target as HTMLSelectElement).value;
  };

  const error = createElement('small', 'error-msg');

  wrapper.appendChild(lbl);
  wrapper.appendChild(select);
  wrapper.appendChild(error);
  return wrapper;
};
