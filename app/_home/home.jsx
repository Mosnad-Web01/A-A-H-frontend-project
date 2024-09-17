'use client';

import React, { useState, useEffect } from 'react';
import MovieListHeading from '../../components/Movies/MovieListHeading';
import SearchBox from '../../components/Movies/SearchBox';
import MovieList from '../../components/Movies/MovieList';
import {fetchMovies} from '../lib/fetchMovies'; // Import the function from generalFetch

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchMovies(searchValue);
      setMovies(movies);
    };
    
    getMovies();
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
