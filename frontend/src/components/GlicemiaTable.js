import React from 'react';
import axios from 'axios';
import { GLICEMIA_TIPOS } from '../utils/constants';

const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/glicemia';

// Função auxiliar para formatar a data
const formatDateString = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

const GlicemiaTable = ({ registros, onDataFetched }) => {

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este registro?')) {
      try {
        await axios.delete(`${apiBaseUrl}/${id}`);
        onDataFetched(); // Atualiza a tabela após a exclusão
        alert('Registro excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir o registro.');
        console.error(error);
      }
    }
  };

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
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id}>
              <td>{formatDateString(registro.data)}</td>
              <td>{GLICEMIA_TIPOS.find(t => t === registro.tipo) || registro.tipo}</td>
              <td>{registro.valor} mg/dL</td>
              <td>
                <button onClick={() => handleDelete(registro.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GlicemiaTable;
