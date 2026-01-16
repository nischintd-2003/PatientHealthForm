import type { Patient, AppState } from './types';

const initialState: AppState = {
  patients: [],
};

const state: AppState = initialState;

type Listener = () => void;
const listeners: Listener[] = [];

const notify = () => {
  listeners.forEach((listener) => listener());
};
