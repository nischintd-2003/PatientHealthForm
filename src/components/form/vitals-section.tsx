import type { FormSectionProps } from '../../interface/form-state-type';

export default function VitalsSection({ form, errors, onChange }: FormSectionProps) {
  return (
    <section className="form-card">
      <div className="card-header">
        <i className="ri-heart-pulse-fill"></i>
        <h3>Vitals</h3>
      </div>

      <div className="row">
        <div className="form-group col-third">
          <label className="required">Height (cm)</label>
          <input
            name="height"
            min="150"
            max="250"
            value={form.height ?? ''}
            onChange={(e) => onChange(e)}
            type="number"
          />
          {errors.height && <small className="error-msg">{errors.height}</small>}
        </div>

        <div className="form-group col-third">
          <label className="required">Weight (kg)</label>
          <input
            name="weight"
            min="30"
            max="200"
            value={form.weight ?? ''}
            onChange={(e) => onChange(e)}
            type="number"
          />
          {errors.weight && <small className="error-msg">{errors.weight}</small>}
        </div>

        <div className="form-group col-third">
          <label>Blood Type</label>
          <select name="bloodType" value={form.bloodType} onChange={onChange}>
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodType && <small className="error-msg">{errors.bloodType}</small>}
        </div>
      </div>

      <div className="row">
        <div className="form-group col">
          <label>Blood Pressure (mmHg)</label>
          <input
            name="bloodPressure"
            value={form.bloodPressure}
            onChange={onChange}
            placeholder="e.g. 120/80"
            type="text"
          />
          {errors.bloodPressure && <small className="error-msg">{errors.bloodPressure}</small>}
        </div>

        <div className="form-group col">
          <label>Body Temperature (°C)</label>
          <input
            name="bodyTemperature"
            value={form.bodyTemperature ?? ''}
            onChange={onChange}
            placeholder="37.5"
            type="number"
            step="0.1"
          />
          {errors.bodyTemp && <small className="error-msg">{errors.bodyTemp}</small>}
        </div>
      </div>
    </section>
  );
}
