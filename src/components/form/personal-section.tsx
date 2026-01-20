import type { FormSectionProps } from '../../interface/form-state-type';

export default function PersonalSection({ form, errors, onChange }: FormSectionProps) {
  return (
    <section className="form-card">
      <div className="card-header">
        <i className="ri-user-3-fill"></i>
        <h3>Personal Details</h3>
      </div>

      <div className="row">
        <div className="form-group col">
          <label className="required">Full Name</label>
          <input name="fullName" value={form.fullName} onChange={onChange} type="text" />
          {errors.fullName && <small className="error-msg">{errors.fullName}</small>}
        </div>
        <div className="form-group col">
          <label className="required">Date of Birth</label>
          <input name="dob" value={form.dob} onChange={onChange} type="date" />
          {errors.dob && <small className="error-msg">{errors.dob}</small>}
        </div>
      </div>

      <div className="row">
        <div className="form-group col">
          <label className="required">Email</label>
          <input name="email" value={form.email} onChange={onChange} type="email" />
          {errors.email && <small className="error-msg">{errors.email}</small>}
        </div>
        <div className="form-group col">
          <label className="required">Phone</label>
          <input name="phone" value={form.phone} onChange={onChange} type="tel" />
          {errors.phone && <small className="error-msg">{errors.phone}</small>}
        </div>
      </div>
    </section>
  );
}
