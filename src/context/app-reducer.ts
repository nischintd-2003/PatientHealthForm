import type { AppAction } from '../interface/app-action-type';
import type { AppState } from '../interface/app-state-type';

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
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
        editingId: state.editingId === action.payload ? null : state.editingId,
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
