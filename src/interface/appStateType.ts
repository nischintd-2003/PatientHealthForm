import type { Patient } from './patientType';

export interface AppState {
  patients: Patient[];
  editingId: string | null;
}
