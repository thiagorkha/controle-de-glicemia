// src/App.js

import React, { useState, useEffect } from 'react';

// O componente principal da sua aplicação.
function App() {
  // useState para armazenar os dados do formulário (valor inicial vazio).
  const [formData, setFormData] = useState({
    nome: '',
    email: ''
  });
  
  // useState para armazenar a lista de usuários, com um valor inicial vazio.
  // Usamos useEffect para carregar os dados do localStorage.
  const [users, setUsers] = useState(() => {
    // Tenta carregar dados do localStorage ao iniciar.
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // useEffect para salvar os dados no localStorage sempre que a lista de usuários for atualizada.
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Função para lidar com a mudança nos inputs do formulário.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Função para lidar com o envio do formulário.
  const handleSubmit = (e) => {
    // Previne o comportamento padrão de recarregar a página.
    e.preventDefault();

    // Adiciona o novo usuário ao início da lista (sem recarregar).
    setUsers(prevUsers => [formData, ...prevUsers]);

    // Limpa os campos do formulário após o envio.
    setFormData({ nome: '', email: '' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Cadastro de Usuários</h1>

        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="nome" className="text-gray-700 font-medium mb-1">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Digite o nome"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Digite o email"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Adicionar Usuário
          </button>
        </form>

        {/* Tabela de visualização dos usuários */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Lista de Usuários</h2>
        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left font-bold">Nome</th>
                  <th className="py-3 px-4 text-left font-bold">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{user.nome}</td>
                    <td className="py-3 px-4">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">Nenhum usuário cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}

export default App;
