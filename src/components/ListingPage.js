// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import InfiniteScroll from 'react-infinite-scroll-component';

// const ListingPage = () => {
//   const [pokemonList, setPokemonList] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);

//   const loadMorePokemon = () => {
//     axios
//       .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`)
//       .then(response => {
//         setPokemonList(prevList => [...prevList, ...response.data.results]);
//         setHasMore(response.data.next !== null);
//         setPage(prevPage => prevPage + 1);
//       });
//   };

//   useEffect(() => {
//     loadMorePokemon();
//   }, []);

//   return (
//     <InfiniteScroll
//       dataLength={pokemonList.length}
//       next={loadMorePokemon}
//       hasMore={hasMore}
//       loader={<h4>Loading...</h4>}
//     >
//       {pokemonList.map(pokemon => (
//         <div>
//         <div key={pokemon.name}>{pokemon.name}</div>
//         <img src={pokemon.sprites.front_default} alt={pokemon.name} />
//         </div>
//       ))}
//     </InfiniteScroll>
//   );
// };

// export default ListingPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListingPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      const data = response.data.results;
      const pokemonDataPromises = data.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return response.data;
      });
      const pokemonData = await Promise.all(pokemonDataPromises);
      setPokemonList((prevList) => [...prevList, ...pokemonData]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  useEffect(() => {
    loadPokemon();
  }, [offset]);

  return (
    <div onScroll={handleScroll} style={{ height: '500px', overflow: 'auto' }}>
      <h1>Pokémon Listing</h1>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>Error occurred while fetching Pokémon data.</p>}
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <span>{pokemon.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingPage;

