'use client';

import React, { useState, useEffect } from 'react';
import MovieListHeading from '../../components/Movies/MovieListHeading';
import SearchBox from '../../components/Movies/SearchBox';
import MovieList from '../../components/Movies/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const fetchMovies = async (query) => {
    // Normalize the search value to lowercase
    const normalizedQuery = query.trim().toLowerCase();

    let url;

    if (normalizedQuery === '') {
      // Fetch popular movies
      url = `http://www.omdbapi.com/?s=star wars&apikey=ddae6c15`;
    } else {
      // Search for movies
      url = `http://www.omdbapi.com/?s=${encodeURIComponent(normalizedQuery)}&apikey=ddae6c15`;
    }

    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log(responseJson);

      if (responseJson.results || responseJson.Search) {
        setMovies(responseJson.results || responseJson.Search);
      } else {
        setMovies([]); // Clear movies if no results
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); // Handle error gracefully
    }
  };

  useEffect(() => {
    fetchMovies(searchValue);
  }, [searchValue]);

  return (
    
    <div relative min-h-screen> 
      
          <header className='text-4xl text-white font-bold text-center mb-8'>
            <div className='row d-flex align-items-center mt-4 mb-4'>

              <MovieListHeading heading='Movies' />
              <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <h1>Movie Recommendations</h1>
          </header>
          <main className='relative min-h-screen'>

          <section className='container mx-auto'>
          <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            <MovieList movies={movies} />
          </section>
        </section>
      </main>
    </div>
  );
};

export default Home;
