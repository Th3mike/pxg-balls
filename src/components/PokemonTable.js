import React, { useState, useEffect } from "react";
import axios from "axios";
import HelpTooltip from "./HelpToolTip";

const balls = [
  {
    name: "Poké Ball",
    multiplier: 5,
    image: "https://wiki.pokexgames.com/images/1/15/PokeBall.png",
  },
  {
    name: "Great Ball",
    multiplier: 20,
    image: "https://wiki.pokexgames.com/images/5/5f/GreatBall.png",
  },
  {
    name: "Super Ball",
    multiplier: 50,
    image: "https://wiki.pokexgames.com/images/e/e7/SuperBall.png",
  },
  {
    name: "Ultra Ball",
    multiplier: 130,
    image: "https://wiki.pokexgames.com/images/8/8a/UltraBall.png",
  },
];

const PokemonTable = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxPaginationButtons = 5; // Máximo de botões na paginação

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-pokemon")
      .then((response) => {
        setPokemonData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    if (query.length >= 4) {
      const filtered = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(pokemonData);
    }
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Lógica para exibir botões de paginação limitados
  const startPage = Math.max(
    1,
    currentPage - Math.floor(maxPaginationButtons / 2)
  );
  const endPage = Math.min(totalPages, startPage + maxPaginationButtons - 1);
  const paginationRange = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="max-w-6xl mx-auto p-4 dark:text-white">
      <input
        type="text"
        placeholder="Pesquisar Pokémon"
        value={search}
        onChange={handleSearch}
        className="border border-gray-300 rounded-lg p-2 w-full mb-4 dark:bg-gray-800 dark:text-white"
      />

      <table className="table-auto w-full border-collapse border border-gray-400 dark:border-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 dark:border-gray-700">
              Pokémon
            </th>
            <th className="border border-gray-300 px-4 py-2 dark:border-gray-700">
              Preço NPC
            </th>
            {balls.map((ball) => (
              <th
                key={ball.name}
                className="border border-gray-300 px-4 py-2 dark:border-gray-700"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={ball.image}
                    alt={ball.name}
                    className="w-6 h-6 mb-1"
                  />
                  {ball.name}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((pokemon, index) => {
            const basePrice = parseFloat(
              pokemon.price.replace("$", "").replace(",", "")
            );
            return (
              <tr key={index} className="text-center dark:text-white">
                <td className="border border-gray-300 px-4 py-2 dark:border-gray-700">
                  <div className="flex items-center justify-center space-x-2">
                    <img
                      src={pokemon.imageUrl}
                      alt={pokemon.name}
                      className="w-6 h-6"
                    />
                    <span>{pokemon.name}</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 dark:border-gray-700">
                  {pokemon.price}
                </td>
                {balls.map((ball) => (
                  <td
                    key={ball.name}
                    className="border border-gray-300 px-4 py-2 dark:border-gray-700"
                  >
                    {(basePrice / ball.multiplier).toFixed(0)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="flex justify-center items-center mt-4">
        {currentPage > 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
          >
            Anterior
          </button>
        )}
        {paginationRange.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
            }`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
          >
            Próximo
          </button>
        )}
      </div>
      < HelpTooltip/>
    </div>
  );
};

export default PokemonTable;
