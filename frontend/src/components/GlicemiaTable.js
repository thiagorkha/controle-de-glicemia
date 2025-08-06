import React from 'react';
import { GLICEMIA_TIPOS } from '../utils/constants';

// Função auxiliar para formatar a data
const formatDateString = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

const GlicemiaTable = ({ registros }) => {
  if (!registros || registros.length === 0) {
    return <p>Nenhum registro encontrado.</p>;
  }

  return (
    <div className="table-section">
      <h3>Registros de Glicemia</h3>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id}>
              <td>{formatDateString(registro.data)}</td>
              <td>{GLICEMIA_TIPOS.find(t => t === registro.tipo) || registro.tipo}</td>
              <td>{registro.valor} mg/dL</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GlicemiaTable;
