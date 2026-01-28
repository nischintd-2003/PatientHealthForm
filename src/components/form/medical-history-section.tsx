import type { FormSectionProps } from '../../interface/form-state-type';
import { chronicDiseasesConst } from '../../config';

export default function MedicalHistorySection({ form, errors, onChange }: FormSectionProps) {
  function handleDiseaseChange(disease: string, checked: boolean) {
    let updated = [...form.chronicDiseases];

    if (disease === 'None') {
      updated = checked ? ['None'] : [];
    } else {
      updated = updated.filter((d) => d !== 'None');

      if (checked) {
        updated.push(disease);
      } else {
        updated = updated.filter((d) => d !== disease);
      }
    }

    onChange({
      target: { name: 'chronicDiseases', value: updated },
    } as any);
  }

  return (
    <section className="form-card">
      <div className="card-header">
        <i className="ri-health-book-line"></i>
        <h3>Medical History</h3>
      </div>

      <div className="form-group" id="diseaseGroup">
        <label className="required">Chronic Diseases (Select at least 1)</label>
        <div className="checkbox-wrapper">
          {chronicDiseasesConst.map((disease) => {
            const checked = form.chronicDiseases.includes(disease);

            return (
              <label key={disease} className="check-box">
                <input
                  type="checkbox"
                  name="chronicDiseases"
                  value={disease}
                  checked={checked}
                  onChange={(e) => handleDiseaseChange(disease, e.target.checked)}
                />{' '}
                {disease}
              </label>
            );
          })}
        </div>

        {errors.chronicDiseases && <small className="error-msg">{errors.chronicDiseases}</small>}
      </div>

      <div className="row">
        <div className="form-group col">
          <label htmlFor="medications">Current Medications</label>
          <textarea
            id="medications"
            name="medications"
            placeholder="List current meds..."
            value={form.medications}
            onChange={onChange}
          />
        </div>

        <div className="form-group col">
          <label htmlFor="allergies">Allergies</label>
          <textarea
            id="allergies"
            name="allergies"
            placeholder="e.g. Penicillin, Peanuts"
            value={form.allergies}
            onChange={onChange}
          />
        </div>
      </div>
    </section>
  );
}
