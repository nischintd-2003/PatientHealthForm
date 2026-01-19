import type { Patient } from './interface/patientType';

const STORAGE_KEY = 'patients';

export const loadPatients = (): Patient[] => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : [];
  } catch (e) {
    console.error('Failed to load patients from storage', e);
    return [];
  }
};

export const savePatients = (patients: Patient[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  } catch (e) {
    console.error('Failed to save patients to storage', e);
  }
};
