import React from 'react';
import GlicemiaFilter from './GlicemiaFilter';

// ... no GlicemiaTable.js

const GlicemiaTable = ({ data, onFilter }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="table-section">
      <h3>Visualizar Registros</h3>
      <GlicemiaFilter onFilter={onFilter} />
      
      {data.length > 0 ? (
        <>
          {/* Adicione um contêiner para a área de impressão */}
          <div className="printable-area">
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Valor (mg/dL)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.data}</td>
                    <td>{item.tipo}</td>
                    <td>{item.valor}</td>
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
