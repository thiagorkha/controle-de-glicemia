import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const tiposMedicao = [
  "Glicemia Jejum", "Glicemia 2h após café", "Glicemia antes do almoço",
  "Glicemia 2h após almoço", "Glicemia antes do Jantar", "Glicemia 2h após o Jantar",
  "Glicemia ao deitar", "Glicemia as 3:00"
];

function GlicemiaTable({ data }) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div ref={componentRef}>
        <h2>Tabela de Glicemia</h2>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              {tiposMedicao.map((tipo, index) => <th key={index}>{tipo}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.data}</td>
                {tiposMedicao.map((tipo, i) => (
                  <td key={i}>{row[tipo] || '-'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handlePrint}>Imprimir Tabela</button>
    </div>
  );
}

export default GlicemiaTable;
