import type { Patient } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validatePatient(p: Patient): ValidationResult {
  const errors: Record<string, string> = {
    ...getRequiredFieldErrors(p),
    ...getFormatErrors(p),
    ...getBusinessLogicErrors(p),
  };

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function getRequiredFieldErrors(p: Patient): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!p.fullName?.trim()) {
    errors.fullName = 'Full Name is required';
  }
  if (!p.dob) {
    errors.dob = 'Date of Birth is required';
  }
  if (!p.email?.trim()) {
    errors.email = 'Email is required';
  }
  if (!p.phone?.trim()) {
    errors.phone = 'Phone is required';
  }

  if (!p.exerciseFrequency) {
    errors.exerciseFrequency = 'Please select an option';
  }
  if (!p.chronicDiseases || p.chronicDiseases.length === 0) {
    errors.chronicDiseases = 'Select "None" or a disease';
  }

  return errors;
}

function getFormatErrors(p: Patient): Record<string, string> {
  const errors: Record<string, string> = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (p.email && !emailRegex.test(p.email)) {
    errors.email = 'Invalid email format';
  }
  if (p.phone && !phoneRegex.test(p.phone)) {
    errors.phone = 'Phone must be 10 digits';
  }

  return errors;
}

function getBusinessLogicErrors(p: Patient): Record<string, string> {
  const errors: Record<string, string> = {};

  if (p.dob && !isAdult(p.dob)) {
    errors.dob = 'You must be at least 18 years old';
  }

  if (p.height !== null && (p.height < 50 || p.height > 250)) {
    errors.height = 'Height must be 50-250 cm';
  }

  if (p.weight !== null && (p.weight < 10 || p.weight > 300)) {
    errors.weight = 'Weight must be 10-300 kg';
  }

  return errors;
}

function isAdult(dob: string): boolean {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
}
