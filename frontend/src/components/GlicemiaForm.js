import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GLICEMIA_TIPOS } from '../utils/constants';

const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/glicemia';

const GlicemiaForm = ({ onSave }) => {
  const [data, setData] = useState(new Date());
  const [tipo, setTipo] = useState(GLICEMIA_TIPOS[0]);
  const [valor, setValor] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!valor) {
      setError('Por favor, insira o valor da glicemia.');
      return;
    }
    
    // CORREÇÃO: ADICIONA 1 DIA À DATA ANTES DE FORMATAR PARA COMPENSAR O FUSO HORÁRIO
    const dataCorrigida = new Date(data);
    dataCorrigida.setDate(dataCorrigida.getDate() + 1);

    const dia = String(dataCorrigida.getDate()).padStart(2, '0');
    const mes = String(dataCorrigida.getMonth() + 1).padStart(2, '0');
    const ano = dataCorrigida.getFullYear();
    const formattedDate = `${ano}-${mes}-${dia}`;
    
    const payload = {
      data: formattedDate,
      tipo,
      valor: parseFloat(valor),
    };

    try {
      await axios.post(apiBaseUrl, payload);
      alert('Registro salvo com sucesso!');
      setValor('');
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
