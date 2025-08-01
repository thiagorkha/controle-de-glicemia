import React, { useState } from 'react';
import GlicemiaForm from './components/GlicemiaForm';
import FilterForm from './components/FilterForm';
import GlicemiaTable from './components/GlicemiaTable';
import './index.css';

function App() {
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);

  const handleShowTable = (data) => {
    setTableData(data);
    setShowTable(true);
  };

  const handleHideTable = () => {
    setShowTable(false);
  };

  return (
    <div className="app-container">
      <h1>Controle de Glicemia</h1>
      {!showTable ? (
        <>
          <GlicemiaForm />
          <button onClick={() => setShowTable(true)}>Visualizar Tabela</button>
        </>
      ) : (
        <>
          <FilterForm onFilter={handleShowTable} />
          <GlicemiaTable data={tableData} />
          <button onClick={handleHideTable}>Voltar para o Formulário</button>
        </>
      )}
    </div>
  );
}

export default App;
