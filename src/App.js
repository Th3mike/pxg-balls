import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonTable from './components/PokemonTable';

const App = () => {
  // Recupera o estado do 'darkMode' do localStorage ou usa 'false' se não existir
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(savedDarkMode);
  const [loading, setLoading] = useState(true); // Estado para controle do carregamento

  useEffect(() => {
    // Simula o carregamento dos dados (por exemplo, com axios)
    axios.get("http://localhost:5000/get-pokemon")
      .then((response) => {
        // Dados carregados, muda para false
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar os dados:", error);
        setLoading(false); // Mesmo em caso de erro, deixa de mostrar o loading
      });
  }, []);

  // Salva o estado do 'darkMode' no localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-900 min-h-screen p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-4 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
        >
          {darkMode ? 'Modo Claro' : 'Modo Escuro'}
        </button>

        {/* Condicionalmente exibe o spinner enquanto o carregamento está em andamento */}
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
          </div>
        ) : (
          <PokemonTable />
        )}
      </div>
    </div>
  );
};

export default App;
