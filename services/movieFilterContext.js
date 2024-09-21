import { createContext, useContext, useState } from 'react';
// Create the context
const MovieFilterContext = createContext();

// Context provider component
export const MovieFilterProvider = ({ children }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);

  return (
    <MovieFilterContext.Provider value={{ filteredMovies, setFilteredMovies }}>
      {children}
    </MovieFilterContext.Provider>
  );
};

// Custom hook to use the movieFilterContext
export const useMovieFilter = () => useContext(MovieFilterContext);
