import { createElement } from '../utils/dom';
import { deletePatient, setEditingId } from '../appLogic';
import { getState } from '../appState';
import { tableHeadersConst } from '../constants';

export function Table(): HTMLElement {
  const container = createElement('div', 'display-patient-table');

  const table = createElement('table', 'patient-table');

  const thead = createElement('thead');
  const headerRow = createElement('tr');

  tableHeadersConst.forEach((text) => {
    const th = createElement('th', '', text);
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  table.appendChild(tableBody());
  container.appendChild(table);
  return container;
}

const tableLenght: string = String(tableHeadersConst.length);

export function tableBody(): HTMLElement {
  const state = getState();
  const tbody = createElement('tbody');
  if (state.patients.length === 0) {
    const emptyRow = createElement('tr');
    const emptyCell = createElement('td', 'empty-cell', 'No records found.');
    emptyCell.setAttribute('colspan', tableLenght);
    emptyRow.appendChild(emptyCell);
    tbody.appendChild(emptyRow);
  } else {
    state.patients.forEach((p) => {
      const row = createElement('tr');

      const createCell = (text: string) => createElement('td', '', text);

      const format = (val: any, suffix = '') =>
        val !== null && val !== '' && val !== undefined ? `${val}${suffix}` : 'N/A';

      const diseaseText = p.chronicDiseases?.length ? p.chronicDiseases.join(', ') : 'None';

      row.appendChild(createCell(format(p.fullName)));
      row.appendChild(createCell(format(p.dob)));
      row.appendChild(createCell(format(p.email)));
      row.appendChild(createCell(format(p.phone)));
      row.appendChild(createCell(format(p.height, ' cm')));
      row.appendChild(createCell(format(p.weight, ' kg')));
      row.appendChild(createCell(format(p.bloodType)));
      row.appendChild(createCell(format(p.bloodPressure)));
      row.appendChild(createCell(format(p.bodyTemperature, '°C')));
      row.appendChild(createCell(diseaseText));
      row.appendChild(createCell(format(p.medications)));
      row.appendChild(createCell(format(p.allergies)));
      row.appendChild(createCell(format(p.exerciseFrequency)));
      row.appendChild(createCell(format(p.sleepHours, ' hrs')));
      row.appendChild(createCell(format(p.dietType)));

      const actionCell = createElement('td');

      const editBtn = createElement('button', 'edit-btn', 'Edit');

      if (state.editingId === p.id) {
        editBtn.disabled = true;
        editBtn.style.opacity = '0.5';
      }

      editBtn.onclick = () => {
        setEditingId(p.id);
      };

      const deleteBtn = createElement('button', 'del-btn', 'Delete');
      deleteBtn.onclick = () => {
        if (confirm(`Are you sure you want to delete ${p.fullName}?`)) {
          deletePatient(p.id);
        }
      };

      actionCell.appendChild(editBtn);
      actionCell.appendChild(deleteBtn);
      row.appendChild(actionCell);
      tbody.appendChild(row);
    });
  }
  return tbody;
}
