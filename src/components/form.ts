import { createElement } from '../utils/dom';
import { addPatient } from '../appState';

interface LocalFormState {
  fullName: string;
  dob: string;
  email: string;
  phone: string;
  height: number | null;
  weight: number | null;
  bloodType: string;
  dietType: string;
  exerciseFrequency: string;
  chronicDiseases: string[];
}

export function Form(): HTMLElement {
  const container = createElement('div', 'form-container');
  const title = createElement('h3', '', 'Patient Form');

  const formState: LocalFormState = {
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    height: null,
    weight: null,
    bloodType: '',
    dietType: 'Standard',
    exerciseFrequency: '',
    chronicDiseases: [],
  };

  const fullNameInput = createElement('input') as HTMLInputElement;
  fullNameInput.type = 'text';
  fullNameInput.placeholder = 'Full Name';
  fullNameInput.oninput = (e) => {
    formState.fullName = (e.target as HTMLInputElement).value;
  };

  const fullNameError = createElement('span', 'error-msg');
  fullNameError.style.display = 'none';

  const dobInput = createElement('input') as HTMLInputElement;
  dobInput.type = 'date';
  dobInput.placeholder = 'Date of Birth';
  dobInput.oninput = (e) => {
    formState.dob = (e.target as HTMLInputElement).value;
  };

  const dobError = createElement('span', 'error-msg');
  dobError.style.display = 'none';

  const emailInput = createElement('input') as HTMLInputElement;
  emailInput.type = 'email';
  emailInput.placeholder = 'Email';
  emailInput.oninput = (e) => {
    formState.email = (e.target as HTMLInputElement).value;
  };

  const emailError = createElement('span', 'error-msg');
  emailError.style.display = 'none';

  const phoneInput = createElement('input') as HTMLInputElement;
  phoneInput.type = 'tel';
  phoneInput.placeholder = 'Phone';
  phoneInput.oninput = (e) => {
    formState.phone = (e.target as HTMLInputElement).value;
  };

  const phoneError = createElement('span', 'error-msg');
  phoneError.style.display = 'none';

  const heightInput = createElement('input') as HTMLInputElement;
  heightInput.type = 'number';
  heightInput.placeholder = 'Height (cm)';
  heightInput.min = '50';
  heightInput.max = '250';
  heightInput.oninput = (e) => {
    const value = (e.target as HTMLInputElement).value;
    formState.height = value ? Number(value) : null;
  };

  const heightError = createElement('span', 'error-msg');
  heightError.style.display = 'none';

  const weightInput = createElement('input') as HTMLInputElement;
  weightInput.type = 'number';
  weightInput.placeholder = 'Weight (kg)';
  weightInput.min = '10';
  weightInput.max = '300';
  weightInput.oninput = (e) => {
    const value = (e.target as HTMLInputElement).value;
    formState.weight = value ? Number(value) : null;
  };

  const weightError = createElement('span', 'error-msg');
  weightError.style.display = 'none';

  const bloodTypeSelect = createElement('select') as HTMLSelectElement;
  const bloodTypes = ['', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  bloodTypes.forEach((type) => {
    const option = createElement('option') as HTMLOptionElement;
    option.value = type;
    option.textContent = type === '' ? 'Select Blood Type' : type;
    bloodTypeSelect.appendChild(option);
  });

  bloodTypeSelect.onchange = (e) => {
    formState.bloodType = (e.target as HTMLSelectElement).value;
  };

  const bloodTypeError = createElement('span', 'error-msg');
  bloodTypeError.style.display = 'none';

  const dietSelect = createElement('select') as HTMLSelectElement;
  const dietTypes = ['Standard', 'Vegetarian', 'Vegan', 'Keto'];

  dietTypes.forEach((type) => {
    const option = createElement('option') as HTMLOptionElement;
    option.value = type;
    option.textContent = type;
    dietSelect.appendChild(option);
  });

  dietSelect.onchange = (e) => {
    formState.dietType = (e.target as HTMLSelectElement).value;
  };

  const dietTypeError = createElement('span', 'error-msg');
  dietTypeError.style.display = 'none';

  const exerciseLabel = createElement('p', '', 'Exercise Frequency:');

  const exerciseOptions = ['Never', 'Occasionally', 'Regularly', 'Daily'];

  const exerciseContainer = createElement('div', 'exercise-group');

  exerciseOptions.forEach((option) => {
    const label = createElement('label');
    const input = createElement('input') as HTMLInputElement;

    input.type = 'radio';
    input.name = 'exerciseFrequency';
    input.value = option;

    input.onchange = (e) => {
      formState.exerciseFrequency = (e.target as HTMLInputElement).value;
    };

    label.appendChild(input);
    label.append(` ${option}`);
    exerciseContainer.appendChild(label);
  });

  const exerciseError = createElement('span', 'error-msg');
  exerciseError.style.display = 'none';

  const diseaseOptions = ['None', 'Diabetes', 'Hypertension', 'Asthma', 'Other'];

  const diseaseLabel = createElement('p', '', 'Chronic Diseases:');

  const diseaseContainer = createElement('div', 'disease-group');

  diseaseOptions.forEach((option) => {
    const label = createElement('label');
    const input = createElement('input') as HTMLInputElement;

    input.type = 'checkbox';
    input.value = option;

    input.onchange = () => {
      const value = input.value;

      if (value === 'None') {
        if (input.checked) {
          formState.chronicDiseases = ['None'];

          const checkboxes = diseaseContainer.querySelectorAll('input[type="checkbox"]');
          checkboxes.forEach((cb) => {
            if ((cb as HTMLInputElement).value !== 'None') {
              (cb as HTMLInputElement).checked = false;
            }
          });
        } else {
          formState.chronicDiseases = [];
        }
      } else {
        formState.chronicDiseases = formState.chronicDiseases.filter((d) => d !== 'None');

        if (input.checked) {
          formState.chronicDiseases.push(value);
        } else {
          formState.chronicDiseases = formState.chronicDiseases.filter((d) => d !== value);
        }

        const noneCheckbox = diseaseContainer.querySelector(
          'input[value="None"]',
        ) as HTMLInputElement;
        if (noneCheckbox) {
          noneCheckbox.checked = false;
        }
      }
    };

    label.appendChild(input);
    label.append(` ${option}`);
    diseaseContainer.appendChild(label);
  });

  const diseaseError = createElement('span', 'error-msg');
  diseaseError.style.display = 'none';

  const submitButton = createElement('button', 'btn-submit', 'Submit');

  submitButton.type = 'button';

  submitButton.onclick = () => {
    handleSubmit();
  };

  container.appendChild(submitButton);

  container.appendChild(title);
  container.appendChild(fullNameInput);
  container.appendChild(fullNameError);
  container.appendChild(dobInput);
  container.appendChild(dobError);
  container.appendChild(emailInput);
  container.appendChild(emailError);
  container.appendChild(phoneInput);
  container.appendChild(phoneError);
  container.appendChild(heightInput);
  container.appendChild(heightError);
  container.appendChild(weightInput);
  container.appendChild(weightError);
  container.appendChild(bloodTypeSelect);
  container.appendChild(bloodTypeError);
  container.appendChild(dietSelect);
  container.appendChild(dietTypeError);
  container.appendChild(exerciseLabel);
  container.appendChild(exerciseContainer);
  container.appendChild(exerciseError);
  container.appendChild(diseaseLabel);
  container.appendChild(diseaseContainer);
  container.appendChild(dietTypeError);

  function handleSubmit() {
    const patient = {
      id: crypto.randomUUID(),
      fullName: formState.fullName,
      dob: formState.dob,
      email: formState.email,
      phone: formState.phone,
      height: formState.height,
      weight: formState.weight,
      bloodType: formState.bloodType,
      bloodPressure: '',
      bodyTemperature: null,
      chronicDiseases: formState.chronicDiseases,
      medications: '',
      allergies: '',
      exerciseFrequency: formState.exerciseFrequency,
      sleepHours: null,
      dietType: formState.dietType,
    };

    addPatient(patient);

    resetFormUI();

    resetFormState();
  }

  function resetFormState() {
    formState.fullName = '';
    formState.dob = '';
    formState.email = '';
    formState.phone = '';
    formState.height = null;
    formState.weight = null;
    formState.bloodType = '';
    formState.dietType = 'Standard';
    formState.exerciseFrequency = '';
    formState.chronicDiseases = [];
  }

  function resetFormUI() {
    fullNameInput.value = '';
    dobInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    heightInput.value = '';
    weightInput.value = '';
    bloodTypeSelect.value = '';
    dietSelect.value = 'Standard';

    const radioInputs = exerciseContainer.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((r) => ((r as HTMLInputElement).checked = false));

    const checkboxInputs = diseaseContainer.querySelectorAll('input[type="checkbox"]');
    checkboxInputs.forEach((cb) => ((cb as HTMLInputElement).checked = false));
  }

  return container;
}
