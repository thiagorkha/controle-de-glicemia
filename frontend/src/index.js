// Importa o React, que é a biblioteca principal.
import React from 'react';

// Importa a biblioteca ReactDOM do cliente para renderizar o componente na página.
import ReactDOM from 'react-dom/client';

// Importa o arquivo de estilos CSS.
import './index.css';

// Importa o componente principal da sua aplicação.
import App from './App';

// Cria um "root" (raiz) para a sua aplicação usando o elemento HTML com id 'root'.
// Este é o mesmo div que está no arquivo index.html.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente principal (App) dentro do "root".
// O <React.StrictMode> é um componente que ajuda a identificar problemas no código durante o desenvolvimento.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
