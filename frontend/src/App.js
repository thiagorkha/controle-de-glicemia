import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlicemiaForm from './components/GlicemiaForm';
import GlicemiaTable from './components/GlicemiaTable';
import GlicemiaFilter from './components/GlicemiaFilter';
import './index.css';

const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/glicemia';

function App() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiBaseUrl);
      setRegistros(response.data);
      setLoading(false);
    } catch (err) {
      setError('Falha ao buscar os registros.');
      setLoading(false);
      console.error('Erro ao buscar dados:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="app">Carregando...</div>;
  }

  if (error) {
    return <div className="app error-message">{error}</div>;
  }

  return (
    <div className="app">
      <header>
        <h1>Controle de Glicemia</h1>
      </header>
      <main>
        <GlicemiaForm onSave={fetchData} />
        <GlicemiaTable registros={registros} onDataFetched={fetchData} />
        {registros.length > 0 && <GlicemiaChart registros={registros} />}
      </main>
    </div>
  );
}

export default App;
