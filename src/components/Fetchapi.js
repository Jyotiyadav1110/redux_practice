// import React, { useEffect, useState } from 'react'
// import './Style.css'

// export default function Fetchapi() {
// const[data,setData] = useState([]);

//    useEffect(()=>{
                                            
//    })

//   return (
//     <div className='main-container'>
//         <div className='container'>
        
//         {
//         Object.keys(data)?.map((pokemon) => (
//           <li key={pokemon.id}>
//             <img src={pokemon.sprites.front_default} alt={pokemon.name} />
//             <span>{pokemon.name}</span>
//           </li>
//         ))}
//         </div>
//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css'

const ListingPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [showpokemonList, setshowPokemonList] = useState(true);
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
      setshowPokemonList(true);
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
    <div className='main-container' onScroll={handleScroll} >
      <h1>Pokémon Listing</h1>
        {isLoading && <p>Loading...</p>}
        {hasError && <p>Error occurred while fetching Pokémon data.</p>}
      <div className='container'>
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id}>
            <img style={{ height: '300px',width:'300px'}}src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div className='title'>{pokemon.name}</div>
            <button className='btn'>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;

