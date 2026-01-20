import { useState } from 'react';
import { InitialFormState, type LocalFormState } from '../../interface/form-state-type';
import PersonalSection from './personal-section';
import VitalsSection from './vitals-section';
import MedicalHistorySection from './medical-history-section';
import LifestyleSection from './lifestyle-section';
import FormFooter from './form-footer';
import { useAppContext } from '../../context/app-context';

export default function Form() {
  const { state, dispatch } = useAppContext();
  const [form, setForm] = useState<LocalFormState>(InitialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handlePrivacyChange(checked: boolean) {
    setForm((prev) => ({ ...prev, privacyPolicy: checked }));
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
        />
      </form>
    </div>
  );
}
