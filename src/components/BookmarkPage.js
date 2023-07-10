import React, { useState, useEffect } from 'react';

const BookmarkPage = () => {
  const [bookmarkedPokemon, setBookmarkedPokemon] = useState([]);

  // Load bookmarked Pokemon from local storage
  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarkedPokemon');
    if (storedBookmarks) {
      setBookmarkedPokemon(JSON.parse(storedBookmarks));
    }
  }, []);

  // Remove a Pokemon from bookmarks
  const removeBookmark = (pokemon) => {
    const updatedBookmarks = bookmarkedPokemon.filter(
      (item) => item.id !== pokemon.id
    );
    setBookmarkedPokemon(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
  };

  // Save bookmarks to local storage
  const saveBookmarks = (bookmarks) => {
    localStorage.setItem('bookmarkedPokemon', JSON.stringify(bookmarks));
  };

  return (
    <div>
      <h1>Bookmarked Pokemon</h1>
      {bookmarkedPokemon.length === 0 ? (
        <p>No bookmarked Pokemon.</p>
      ) : (
        <ul>
          {bookmarkedPokemon.map((pokemon) => (
            <li key={pokemon.id}>
              <img src={pokemon.imageUrl} alt={pokemon.name} />
              <span>{pokemon.name}</span>
              <button onClick={() => removeBookmark(pokemon)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarkPage;
