/* Sure, I can provide you with a solution for building a web app using ReactJS to create a Pokédex. Here's a step-by-step guide to help you get started:

1. Set up the development environment:
   - Install Node.js and npm (Node Package Manager) if you haven't already.
   - Create a new React project by running the following command in your terminal:
     ```
     npx create-react-app pokedex-app
     ```
   - Change to the project directory:
     ```
     cd pokedex-app
     ```

2. Install necessary dependencies:
   - For making API calls, install the axios library:
     ```
     npm install axios
     ```
   - For infinite scrolling, install the react-infinite-scroll-component library:
     ```
     npm install react-infinite-scroll-component
     ```
   - For routing, install the react-router-dom library:
     ```
     npm install react-router-dom
     ```

3. Create component files:
   - Inside the `src` directory, create the following component files:
     - `SearchPage.js`
     - `ListingPage.js`
     - `DetailsPage.js`
     - `BookmarksPage.js`
   - Open each file and define the basic structure of the component.

4. Implement the Search Page:
   - In `SearchPage.js`, create a form that accepts a Pokémon name to search for.
   - Handle form submission and make an API call to the search endpoint using the axios library.
   - Show a loading state while the API call is in progress and handle success/error responses.

5. Implement the Listing Page:
   - In `ListingPage.js`, create a grid layout to display the Pokémon data received from the API.
   - Use the react-infinite-scroll-component to implement infinite scrolling.
   - Load more Pokémon as the user scrolls and update the grid accordingly.
   - Implement filtering options based on abilities, characteristics, group, habitat, location, and species.

6. Implement the Details Page:
   - In `DetailsPage.js`, display the details of a selected Pokémon in a properly formatted design.
   - Include a bookmark icon that saves or removes the Pokémon as a favorite on the device.
   - Store the bookmarked Pokémon locally on the device.

7. Implement the Bookmarks Page:
   - In `BookmarksPage.js`, display all the bookmarked Pokémon stored locally on the device.
   - Allow users to remove Pokémon from bookmarks.

8. Configure routing:
   - In the `App.js` file, import the necessary components and set up routing using the react-router-dom library.
   - Define routes for the search, listing, details, and bookmarks pages.

9. Styling:
   - Use CSS or a CSS framework of your choice to style the components and create an appealing UI.
   - You can refer to the provided design inspiration or create your own design.

10. Test and Deploy:
    - Test the app locally to ensure all the features are working as expected.
    - Once satisfied, deploy the app to a web server of your choice. You can use platforms like Netlify or Vercel for easy deployment.

11. Create screenshots or a video:
    - Capture screenshots or create a video showcasing the app's features and design.

12. Version Control:
    - Initialize a Git re
    pository in the project directory.
    - Commit your code regularly and push it to a remote repository on GitHub, Bitbucket, or any other preferred platform.

13. Submission:
    - Share the repository's URL with the hiring team via email as mentioned in the assignment.

Remember to plan your project structure, break down the tasks into smaller components, and test your code as you progress. Good luck with your project, and feel free to ask if you have any further questions!
 */


// import React, { useState } from 'react';

// const BookmarksScreen = () => {
//   const [bookmarks, setBookmarks] = useState([]);

//   const removeBookmark = pokemon => {
//     setBookmarks(prevBookmarks => prevBookmarks.filter(item => item.name !== pokemon.name));
//   };

//   return (
//     <div>
//       {bookmarks.length === 0 && <div>No bookmarks</div>}
//       {bookmarks.map(pokemon => (
//         <div key={pokemon.name}>
//           <h2>{pokemon.name}</h2>
//           <button onClick={() => removeBookmark(pokemon)}>Remove</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookmarksScreen;


import React, { useState, useEffect } from 'react';

const BookmarkPage = () => {
  const [bookmarkedPokemon, setBookmarkedPokemon] = useState([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarkedPokemon');
    if (storedBookmarks) {
      setBookmarkedPokemon(JSON.parse(storedBookmarks));
    }
  }, []);

  const removeBookmark = (pokemon) => {
    const updatedBookmarks = bookmarkedPokemon.filter(
      (item) => item.id !== pokemon.id
    );
    setBookmarkedPokemon(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
  };

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
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
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
