import { useState } from 'react';
import { InitialFormState, type LocalFormState } from '../../interface/form-state-type';
import PersonalSection from './personal-section';
import VitalsSection from './vitals-section';
import MedicalHistorySection from './medical-history-section';

export default function Form() {
  const [form, setForm] = useState<LocalFormState>(InitialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="health-form-container">
      <form id="healthForm" noValidate>
        <PersonalSection form={form} errors={errors} onChange={handleChange} />
        <VitalsSection form={form} errors={errors} onChange={handleChange} />
        <MedicalHistorySection form={form} errors={errors} onChange={handleChange} />
      </form>
    </div>
  );
}
