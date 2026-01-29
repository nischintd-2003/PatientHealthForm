import { useState, useEffect } from 'react';
import { InitialFormState, type LocalFormState } from '../../interface/form-state-type';
import PersonalSection from './personal-section';
import VitalsSection from './vitals-section';
import MedicalHistorySection from './medical-history-section';
import LifestyleSection from './lifestyle-section';
import FormFooter from './form-footer';
import { useAppContext } from '../../context/app-context';
import { formToPatient, patientToForm } from '../../utilities/patient-mappers';
import type { Patient } from '../../interface/patient-type';
import { validatePatient } from '../../services/validation-service';

export default function Form() {
  const { state, dispatch } = useAppContext();
  const [form, setForm] = useState<LocalFormState>(InitialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!state.editingId) {
      setForm(InitialFormState);
      setErrors({});
      return;
    }

    const patient = state.patients.find((p) => p.id === state.editingId);
    if (!patient) {
      return;
    }

    setForm(patientToForm(patient));
  }, [state.editingId, state.patients]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  }

  function handlePrivacyChange(checked: boolean) {
    setForm((prev) => ({ ...prev, privacyPolicy: checked }));

    if (errors.privacyPolicy) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.privacyPolicy;
        return updated;
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const patient: Patient = formToPatient(form, state.editingId);

    const validation = validatePatient(patient);

    if (!state.editingId && !form.privacyPolicy) {
      validation.errors.privacyPolicy = 'You must agree to the privacy policy.';
      validation.isValid = false;
    }

    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstKey = Object.keys(validation.errors)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (state.editingId) {
      dispatch({ type: 'UPDATE_PATIENT', payload: patient });
      alert('Patient updated!');
    } else {
      dispatch({ type: 'ADD_PATIENT', payload: patient });
      alert('Patient added!');
    }

    setForm(InitialFormState);
    setErrors({});
    dispatch({ type: 'SET_EDITING', payload: null });
  }

  return (
    <div className="health-form-container">
      <form id="healthForm" noValidate>
        <PersonalSection form={form} errors={errors} onChange={handleChange} />
        <VitalsSection form={form} errors={errors} onChange={handleChange} />
        <MedicalHistorySection form={form} errors={errors} onChange={handleChange} />
        <LifestyleSection form={form} errors={errors} onChange={handleChange} />
        <FormFooter
          editing={!!state.editingId}
          form={form}
          errors={errors}
          onPrivacyChange={handlePrivacyChange}
          handleSubmission={handleSubmit}
        />
      </form>
    </div>
  );
}
