import { tableHeadersConst } from '../config';

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
  return <tbody></tbody>;
}
