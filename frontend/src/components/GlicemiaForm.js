import React, { useState } from 'react';
import axios from 'axios';

const tiposMedicao = [
  "Glicemia Jejum", "Glicemia 2h após café", "Glicemia antes do almoço",
  "Glicemia 2h após almoço", "Glicemia antes do Jantar", "Glicemia 2h após o Jantar",
  "Glicemia ao deitar", "Glicemia as 3:00"
];

function GlicemiaForm() {
  const [data, setData] = useState('');
  const [tipoMedicao, setTipoMedicao] = useState(tiposMedicao[0]);
  const [valor, setValor] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/medicao', {
        data,
        tipo_medicao: tipoMedicao,
        valor: parseFloat(valor),
      });
      setMessage(response.data.message);
      // Limpar formulário após o sucesso
      setData('');
      setValor('');
    } catch (error) {
      setMessage(error.response.data.error || "Erro ao adicionar medição.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Medição</h2>
      <div>
        <label>Data:</label>
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
      </div>
      <div>
        <label>Coluna:</label>
        <select value={tipoMedicao} onChange={(e) => setTipoMedicao(e.target.value)} required>
          {tiposMedicao.map((tipo, index) => (
            <option key={index} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Valor da Glicemia:</label>
        <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
      </div>
      <button type="submit">Salvar Medição</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default GlicemiaForm;
