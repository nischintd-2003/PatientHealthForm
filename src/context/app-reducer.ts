import type { AppState } from '../interface/app-state-type';
import type { Patient } from '../interface/patient-type';

type Action =
  | { type: 'LOAD_FROM_STORAGE'; payload: AppState }
  | { type: 'ADD_PATIENT'; payload: Patient }
  | { type: 'UPDATE_PATIENT'; payload: Patient }
  | { type: 'DELETE_PATIENT'; payload: string }
  | { type: 'SET_EDITING'; payload: string | null };

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_FROM_STORAGE':
      return { ...action.payload };

    case 'ADD_PATIENT':
      return { ...state, patients: [...state.patients, action.payload] };

    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: state.patients.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };

    case 'DELETE_PATIENT':
      return {
        ...state,
        patients: state.patients.filter((p) => p.id !== action.payload),
      };

    case 'SET_EDITING':
      return {
        ...state,
        editingId: action.payload,
      };

    default:
      return state;
  }
}
