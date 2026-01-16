import type { Patient, AppState } from './types';

const initialState: AppState = {
  patients: [],
};

const myAppState: AppState[] = [];
let myAppStateCursor = 0;

type Listener = () => void;
const listeners: Listener[] = [];

const notify = () => {
  listeners.forEach((listener) => listener());
};

export const getState = (stateCursor: number): AppState => {
  return myAppState[stateCursor];
};

export const setState = (newState: AppState) => {
  const stateCursor = myAppStateCursor;
  myAppState[stateCursor] = myAppState[stateCursor] || initialState;
  myAppState[stateCursor] = newState;
  notify();
  myAppStateCursor++;
};

export const subscribe = (listener: Listener) => {
  listeners.push(listener);
};

export const resetState = (stateCursor: number) => {
  myAppState[stateCursor] = initialState;
  notify();
};
