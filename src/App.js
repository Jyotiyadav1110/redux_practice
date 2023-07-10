// import logo from './logo.svg';
// import './App.css';
// import Fetchapi from './components/Fetchapi';
// import SearchPage from './components/SearchPage';

// function App() {
//   return (
//     <div className="App">
//       <SearchPage/>
//       <Fetchapi/>
      
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import SearchPage from './components/SearchPage';
import ListingPage from './components/ListingPage';
import DetailsPage from './components/DetailsPage';
import BookmarksScreen from './components/BookmarksScreen';
import Fetchapi from './components/Fetchapi';
import BookmarkPage from './components/BookmarkPage';
// import InfiniteScroll from 'react-infinite-scroll-component';


const App = () => {
  const [activePage, setActivePage] = useState('search');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  const handlePokemonSearch = pokemon => {
    setSelectedPokemon(pokemon);
    setActivePage('details');
  };

  const toggleBookmark = pokemon => {
    if (bookmarks.some(item => item.name === pokemon.name)) {
      setBookmarks(prevBookmarks => prevBookmarks.filter(item => item.name !== pokemon.name));
    } else {
      setBookmarks(prevBookmarks => [...prevBookmarks, pokemon]);
    }
  };

  return (
    <div>
      <header>
        <button onClick={() => setActivePage('search')}>Search</button>
        <button onClick={() => setActivePage('listing')}>Listing</button>
        <button onClick={() => setActivePage('bookmarks')}>Bookmarks</button>
        <button onClick={() => setActivePage('bookmarkPAge')}>Bookmarks</button>

      </header>
      
      {activePage === 'search' && <SearchPage onPokemonSearch={handlePokemonSearch} />}
      {activePage === 'listing' && <ListingPage />}
      {activePage === 'details' && (
        <DetailsPage pokemon={selectedPokemon} onToggleBookmark={toggleBookmark} />
      )}
      {activePage === 'bookmarks' && <BookmarksScreen bookmarks={bookmarks} />}
      <Fetchapi/>
      {/* <BookmarkPage/> */}
    </div>
  );
};

export default App;

