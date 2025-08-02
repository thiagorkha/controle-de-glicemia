import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GLICEMIA_TIPOS } from '../utils/constants';

const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/glicemia';

const tiposGlicemia = GLICEMIA_TIPOS;

const GlicemiaForm = ({ onSave }) => {
  const [data, setData] = useState(new Date());
  const [tipo, setTipo] = useState(tiposGlicemia[0]);
  const [valor, setValor] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!valor) {
      setError('Por favor, insira o valor da glicemia.');
      return;
    }

    const payload = {
      data: data.toISOString().split('T')[0], // Formato YYYY-MM-DD
      tipo,
      valor: parseFloat(valor),
    };

    try {
      await axios.post(apiBaseUrl, payload);
      alert('Registro salvo com sucesso!');
      setValor('');
      onSave(); // Chama a função para atualizar a tabela
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
          <label htmlFor="data">Data:</label>
          <DatePicker
            selected={data}
            onChange={(date) => setData(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipo">Tipo de Glicemia:</label>
          <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {tiposGlicemia.map((item) => (
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
