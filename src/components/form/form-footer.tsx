import type { FormFooterProps } from '../../interface/form-state-type';

export default function FormFooter({ editing, form, errors, onPrivacyChange }: FormFooterProps) {
  return (
    <div className="footer-actions">
      {!editing && (
        <div className="form-group" id="privacyGroup">
          <label className="check-box required">
            <input
              type="checkbox"
              id="privacy"
              checked={form.privacyPolicy}
              onChange={(e) => onPrivacyChange(e.target.checked)}
            />
            <span>
              I agree to the <a href="#">privacy policy</a> and data processing terms.
            </span>
          </label>

          {errors.privacyPolicy && (
            <small className="error-message" style={{ textAlign: 'center' }}>
              {errors.privacyPolicy}
            </small>
          )}
        </div>
      )}

      <button type="submit" className="btn-submit">
        {editing ? (
          <>
            Update Assessment <i className="ri-save-line"></i>
          </>
        ) : (
          <>
            Submit Assessment <i className="ri-send-plane-fill"></i>
          </>
        )}
      </button>
    </div>
  );
}
