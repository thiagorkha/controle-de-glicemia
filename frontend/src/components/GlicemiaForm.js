import React, { useState } from 'react';
import axios from 'axios';
// Remova a importação do DatePicker
// Remova a importação de 'react-datepicker/dist/react-datepicker.css';
import { GLICEMIA_TIPOS } from '../utils/constants';

const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/glicemia';

const GlicemiaForm = ({ onSave }) => {
  // Use uma string para a data em vez de um objeto Date
  const [data, setData] = useState('');
  const [tipo, setTipo] = useState(GLICEMIA_TIPOS[0]);
  const [valor, setValor] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!valor || !data) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const payload = {
      data: data, // A data já é uma string no formato 'YYYY-MM-DD'
      tipo,
      valor: parseFloat(valor),
    };

    try {
      await axios.post(apiBaseUrl, payload);
      alert('Registro salvo com sucesso!');
      setValor('');
      setData(''); // Limpa o campo de data
      onSave();
    } catch (err) {
      setError('Erro ao salvar o registro. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="form-section">
      <h3>Adicionar Novo Registro</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="data">Data (YYYY-MM-DD):</label>
          <input
            id="data"
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Ex: 2024-12-29"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipo">Tipo de Glicemia:</label>
          <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {GLICEMIA_TIPOS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="valor">Valor (mg/dL):</label>
          <input
            id="valor"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            step="0.1"
            placeholder="Ex: 95.5"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default GlicemiaForm;
