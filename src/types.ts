export interface Patient {
  id: string;
  fullName: string;
  dob: string;
  email: string;
  phone: string;
  height: number | null;
  weight: number | null;
  bloodType: string;
  bloodPressure: string;
  bodyTemperature: number | null;
  chronicDiseases: string[];
  medications: string;
  allergies: string;
  exerciseFrequency: string;
  sleepHours: number | null;
  dietType: string;
}
