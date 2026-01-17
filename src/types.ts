export interface Patient {
  id: string;
  name: string;
  dob: string;
  email: string;
  phone: string;
  height: string;
  weight: string;
  bloodType: string;
  bloodPressure?: string;
  bodyTemperature?: string;
  diseases: string[];
  medications?: string;
  allergies?: string;
  exercise: string;
  sleepHours?: string;
  dietType?: string;
}
