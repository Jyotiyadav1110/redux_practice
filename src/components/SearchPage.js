// import React, { useState } from 'react';

// const SearchPage = () => {
//   const [searchInput, setSearchInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [pokemonData, setPokemonData] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSearch = () => {
//     setLoading(true);
//     setError(null);

//     fetch(`https://api.example.com/pokemon?name=${searchInput}`)
//       .then(response => response.json())
//       .then(data => {
//         setLoading(false);
//         setPokemonData(data);
//       })
//       .catch(error => {
//         setLoading(false);
//         setError(error.message);
//       });
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchInput}
//         onChange={e => setSearchInput(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       {loading && <div>Loading...</div>}

//       {error && <div>Error: {error}</div>}

//       {pokemonData && (
//         <div>
//           <h2>Name: {pokemonData.name}</h2>
//           <p>Type: {pokemonData.type}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchPage;


import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = ({ onPokemonSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`)
      .then(response => {
        setLoading(false);
        onPokemonSearch(response.data);
      })
      .catch(error => {
        setLoading(false);
        setError('Pokemon not found');
      });
  };

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <div>Loading...</div>}

      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default SearchPage;
