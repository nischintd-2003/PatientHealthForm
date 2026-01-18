import { createElement } from '../utils/dom';

interface LocalFormState {
  fullName: string;
  dob: string;
  email: string;
  phone: string;
}

export function Form(): HTMLElement {
  const container = createElement('div', 'form-container');
  const title = createElement('h3', '', 'Patient Form');

  const formState: LocalFormState = {
    fullName: '',
    dob: '',
    email: '',
    phone: '',
  };

  const fullNameInput = createElement('input') as HTMLInputElement;
  fullNameInput.type = 'text';
  fullNameInput.placeholder = 'Full Name';
  fullNameInput.oninput = (e) => {
    formState.fullName = (e.target as HTMLInputElement).value;
  };

  const dobInput = createElement('input') as HTMLInputElement;
  dobInput.type = 'date';
  dobInput.placeholder = 'Date of Birth';
  dobInput.oninput = (e) => {
    formState.dob = (e.target as HTMLInputElement).value;
  };

  const emailInput = createElement('input') as HTMLInputElement;
  emailInput.type = 'email';
  emailInput.placeholder = 'Email';
  emailInput.oninput = (e) => {
    formState.email = (e.target as HTMLInputElement).value;
  };

  const phoneInput = createElement('input') as HTMLInputElement;
  phoneInput.type = 'tel';
  phoneInput.placeholder = 'Phone';
  phoneInput.oninput = (e) => {
    formState.phone = (e.target as HTMLInputElement).value;
  };

  container.appendChild(title);
  container.appendChild(fullNameInput);
  container.appendChild(dobInput);
  container.appendChild(emailInput);
  container.appendChild(phoneInput);

  return container;
}
