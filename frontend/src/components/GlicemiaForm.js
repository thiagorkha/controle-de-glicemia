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
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!valor) {
      setError('Por favor, insira o valor da glicemia.');
      return;
    }
    
    const formattedDate = data.toISOString().split('T')[0];

    const payload = {
      data: formattedDate,
      tipo,
      valor: parseFloat(valor),
      timezone, // ENVIANDO O FUSO HORÁRIO PARA O BACKEND
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

  const commonTimezones = [
    'America/Sao_Paulo', 'UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'
  ];

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
        <div className="form-group">
          <label htmlFor="timezone">Fuso Horário:</label>
          <select id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
            <option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>
              (Padrão) {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </option>
            {commonTimezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default GlicemiaForm;
