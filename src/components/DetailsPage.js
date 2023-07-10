import React from 'react';

const DetailsPage = ({ pokemon }) => {
  return (
    <div>
      <h2>Name: {pokemon.name}</h2>
      <h2>Name: {pokemon.url}</h2>
      <img src={pokemon.sprites.front_default} alt="{pokemon.name}" />

      {/* Display other details */}
    </div>
  );
};

export default DetailsPage;
