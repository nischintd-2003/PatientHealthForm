import type { Patient } from './patient-type';

export interface AppState {
  patients: Patient[];
  editingId: string | null;
}
