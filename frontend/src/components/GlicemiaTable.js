import React from 'react';
import GlicemiaFilter from './GlicemiaFilter';
import { GLICEMIA_TIPOS } from '../utils/constants';

const GlicemiaTable = ({ data, onFilter }) => {
  const handlePrint = () => {
    window.print();
  };

  // 1. Agrupar os dados por data para facilitar o acesso
  const groupedByDate = data.reduce((acc, current) => {
    const date = current.data;
    if (!acc[date]) {
      acc[date] = {};
    }
    acc[date][current.tipo] = current.valor;
    return acc;
  }, {});

  // 2. Extrair a lista de datas ordenadas
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
                    <td>{date}</td>
                    {GLICEMIA_TIPOS.map((tipo) => (
                      <td key={tipo}>
                        {/* Se houver um valor para a data e o tipo, exiba-o. Senão, a célula fica vazia. */}
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
