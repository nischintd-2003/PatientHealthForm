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
