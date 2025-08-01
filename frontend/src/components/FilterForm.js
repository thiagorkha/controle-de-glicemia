import React, { useState } from 'react';
import axios from 'axios';

function FilterForm({ onFilter }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = async () => {
    try {
      const response = await axios.get(`https://controle-de-glicemia.onrender.com/medicoes?start_date=${startDate}&end_date=${endDate}`);
      onFilter(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return (
    <div>
      <h3>Filtrar por Período</h3>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
}

export default FilterForm;
