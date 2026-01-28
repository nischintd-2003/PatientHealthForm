import { tableHeadersConst } from '../config';
import { useAppContext } from '../context/app-context';
import type { Patient } from '../interface/patient-type';

export default function Table() {
  return (
    <div className="display-patient-table">
      <table className="patient-table">
        <TableHead />
        <TableBody />
      </table>
    </div>
  );
}

function TableHead() {
  return (
    <thead>
      <tr>
        {tableHeadersConst.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody() {
  const { state, dispatch } = useAppContext();
  const { patients, editingId } = state;

  const format = (val: any, suffix = ''): string => {
    return val !== null && val !== '' && val !== undefined ? `${val}${suffix}` : 'N/A';
  };

  if (patients.length === 0) {
    return (
      <tbody>
        <tr>
          <td className="empty-cell" colSpan={tableHeadersConst.length}>
            No records found.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {patients.map((p: Patient) => {
        const diseaseText = p.chronicDiseases?.length ? p.chronicDiseases.join(', ') : 'None';

        return (
          <tr key={p.id}>
            <td>{format(p.fullName)}</td>
            <td>{format(p.dob)}</td>
            <td>{format(p.email)}</td>
            <td>{format(p.phone)}</td>
            <td>{format(p.height, ' cm')}</td>
            <td>{format(p.weight, ' kg')}</td>
            <td>{format(p.bloodType)}</td>
            <td>{format(p.bloodPressure)}</td>
            <td>{format(p.bodyTemperature, '°C')}</td>
            <td>{diseaseText}</td>
            <td>{format(p.medications)}</td>
            <td>{format(p.allergies)}</td>
            <td>{format(p.exerciseFrequency)}</td>
            <td>{format(p.sleepHours, ' hrs')}</td>
            <td>{format(p.dietType)}</td>

            <td>
              <button
                className="edit-btn"
                disabled={editingId === p.id}
                style={editingId === p.id ? { opacity: 0.5 } : undefined}
                onClick={() => dispatch({ type: 'SET_EDITING', payload: p.id })}
              >
                Edit
              </button>

              <button
                className="del-btn"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete ${p.fullName}?`)) {
                    dispatch({ type: 'DELETE_PATIENT', payload: p.id });
                  }
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
