import { useState, useEffect } from 'react';
import GenreDropdown from './GenreDropdown'; // Adjust import based on your folder structure
import MovieList from '../Movies/MovieList'; // Adjust import based on your folder structure

const MoviePage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (selectedGenre) {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${PUBLIC_API_KEY}&with_genres=${selectedGenre}`);
          if (!response.ok) {
            throw new Error("Failed to fetch movies");
          }
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      } else {
        // Optionally handle the case when no genre is selected
        setMovies([]); // Clear movies when no genre is selected
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  return (
    <div>
      <GenreDropdown selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviePage;
