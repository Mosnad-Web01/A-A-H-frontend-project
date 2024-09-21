'use client';

import React, { useState, useEffect } from 'react';
import MovieListHeading from '../../components/Movies/MovieListHeading';
import SearchBox from '../../components/Movies/SearchBox';
import MovieList from '../../components/Movies/MovieList';

import { useMovieFilter } from '../lib/movieFilterContext'; // Adjust the path
import { fetchMovies } from '../lib/fetchMovies'; // Adjust the path

const Home = () => {
  const { filteredMovies, setFilteredMovies } = useMovieFilter();

  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // New state for page number
  const [hasMore, setHasMore] = useState(true); // Track if there are more movies to load

  // Function to fetch movies for a specific page
  const getMovies = async (searchValue, page) => {
    try {
      const moviesData = await fetchMovies(searchValue, page); // Fetch movies with pagination
      if (moviesData.length === 0) {
        setHasMore(false); // No more movies to load
      } else {
        setMovies((prevMovies) => (page === 1 ? moviesData : [...prevMovies, ...moviesData])); // Reset or append based on page
        setFilteredMovies((prevMovies) => (page === 1 ? moviesData : [...prevMovies, ...moviesData]));
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Fetch movies whenever the searchValue changes or page is incremented
  useEffect(() => {
    getMovies(searchValue, page); // Fetch based on search and page
  }, [searchValue, page]);

  // Handle search value change
  const handleSearch = (e) => {
    setSearchValue(e.target.value); // Update search value when user types
    setPage(1); // Reset page to 1 for a new search
    setHasMore(true); // Reset hasMore flag for new search
    setMovies([]); // Clear the movies array on a new search
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number when "Load More" is clicked
  };

  return (
    <div className="relative min-h-screen">
      <header className="text-4xl text-white font-bold text-center mb-8">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieListHeading heading="Movies" />
          <SearchBox searchValue={searchValue} setSearchValue={handleSearch} />
        </div>
        <h1>Movie Recommendations</h1>
      </header>
      <main className="relative min-h-screen">
        <section className="container mx-auto">
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <MovieList movies={movies} />
          </section>
          {hasMore && (
            <div className="text-center mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
