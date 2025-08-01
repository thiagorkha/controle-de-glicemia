import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlicemiaForm from './components/GlicemiaForm';
import GlicemiaTable from './components/GlicemiaTable';
import './index.css';

const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/glicemia';

function App() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRegistros = async (startDate = null, endDate = null) => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;
      
      const response = await axios.get(apiBaseUrl, { params });
      setRegistros(response.data);
    } catch (err) {
      setError('Erro ao buscar os registros.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Carrega os dados na montagem do componente
  useEffect(() => {
    fetchRegistros();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Controle de Glicemia</h1>
        
        <GlicemiaForm onSave={() => fetchRegistros()} />
        
        {loading && <p>Carregando registros...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!loading && !error && (
          <GlicemiaTable 
            data={registros} 
            onFilter={fetchRegistros} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
