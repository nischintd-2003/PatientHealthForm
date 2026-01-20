export interface LocalFormState {
  fullName: string;
  dob: string;
  email: string;
  phone: string;
  height: number | null;
  weight: number | null;
  bloodType: string;
  bloodPressure: string;
  bodyTemperature: number | null;
  medications: string;
  allergies: string;
  dietType: string;
  sleepHours: number | null;
  exerciseFrequency: string;
  chronicDiseases: string[];
  privacyPolicy: boolean;
}

export const InitialFormState: LocalFormState = {
  fullName: '',
  dob: '',
  email: '',
  phone: '',
  height: null,
  weight: null,
  bloodType: '',
  bloodPressure: '',
  bodyTemperature: null,
  medications: '',
  allergies: '',
  dietType: 'Standard',
  sleepHours: null,
  exerciseFrequency: '',
  chronicDiseases: [],
  privacyPolicy: false,
};

export interface FormSectionProps {
  form: LocalFormState;
  errors: Record<string, string>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
}
