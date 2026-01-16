import type { Patient, AppState } from './types';

const initialState: AppState = {
  patients: [],
};

let state: AppState = initialState;

type Listener = () => void;
const listeners: Listener[] = [];

const notify = () => {
  listeners.forEach((listener) => listener());
};

export const getState = (): AppState => {
  return state;
};

export const setState = (newState: AppState) => {
  state = newState;
  notify();
};

export const subscribe = (listener: Listener) => {
  listeners.push(listener);
};

export const resetState = () => {
  state = initialState;
  notify();
};
