import type { FormSectionProps } from '../../interface/form-state-type';
import { exerciseFrequencyConst, dietType } from '../../config';

export default function LifestyleSection({ form, errors, onChange }: FormSectionProps) {
  return (
    <section className="form-card">
      <div className="card-header">
        <i className="ri-run-line"></i>
        <h3>Lifestyle</h3>
      </div>

      <div className="row">
        <div className="form-group col" id="exerciseGroup">
          <label className="required">Exercise Frequency</label>

          <div className="tile-group">
            {exerciseFrequencyConst.map((opt) => (
              <label key={opt} className="tile-option">
                <input
                  type="radio"
                  name="exerciseFrequency"
                  value={opt}
                  checked={form.exerciseFrequency === opt}
                  onChange={() =>
                    onChange({
                      target: { name: 'exerciseFrequency', value: opt },
                    } as any)
                  }
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>

          {errors.exerciseFrequency && (
            <small className="error-msg">{errors.exerciseFrequency}</small>
          )}
        </div>

        <div className="col">
          <div className="form-group">
            <label htmlFor="sleep">Sleep Hours/Night</label>
            <input
              id="sleep"
              type="number"
              name="sleepHours"
              placeholder="7"
              min={0}
              max={24}
              value={form.sleepHours ?? ''}
              onChange={onChange}
            />
            {errors.sleepHours && <small className="error-msg">{errors.sleepHours}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="diet">Diet Type</label>
            <select id="diet" name="dietType" value={form.dietType} onChange={onChange}>
              {dietType.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.dietType && <small className="error-msg">{errors.dietType}</small>}
          </div>
        </div>
      </div>
    </section>
  );
}
