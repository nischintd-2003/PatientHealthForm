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
  return <thead></thead>;
}

function TableBody() {
  return <tbody></tbody>;
}
