export interface Patient {
  id: string;
  name: string;
  dob: string;
  email: string;
  phone: string;
  height: string;
  weight: string;
  bloodType: string;
  bp: string;
  temp: string;
  diseases: string[];
  medications: string;
  allergies: string;
  exercise: string;
  sleep: string;
  diet: string;
}

export interface AppState {
  patients: Patient[];
}
