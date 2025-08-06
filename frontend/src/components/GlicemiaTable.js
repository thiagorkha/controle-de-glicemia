import React from 'react';
import GlicemiaFilter from './GlicemiaFilter';
import { GLICEMIA_TIPOS } from '../utils/constants';

// Função para formatar a string de data
const formatDateString = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const GlicemiaTable = ({ data, onFilter }) => {
  const handlePrint = () => {
    window.print();
  };

  const groupedByDate = data.reduce((acc, current) => {
    const date = current.data;
    if (!acc[date]) {
      acc[date] = {};
    }
    acc[date][current.tipo] = current.valor;
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort().reverse();

  return (
    <div className="table-section">
      <h3>Visualizar Registros</h3>
      <GlicemiaFilter onFilter={onFilter} />
      
      {sortedDates.length > 0 ? (
        <>
          <div className="printable-area">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  {GLICEMIA_TIPOS.map((tipo) => (
                    <th key={tipo}>{tipo}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedDates.map((date) => (
                  <tr key={date}>
                    <td>{formatDateString(date)}</td> {/* O código agora usa a nova função */}
                    {GLICEMIA_TIPOS.map((tipo) => (
                      <td key={tipo}>
                        {groupedByDate[date][tipo] || ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={handlePrint} style={{ marginTop: '20px' }}>Imprimir Tabela</button>
        </>
      ) : (
        <p>Nenhum registro encontrado. Use o filtro ou adicione um novo registro.</p>
      )}
    </div>
  );
};

export default GlicemiaTable;
