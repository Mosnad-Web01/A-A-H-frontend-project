'use client';

import React, { useState, useEffect } from 'react';
import MovieList from '../../components/Movies/MovieList';
import { fetchMovies } from '../../services/fetchMovies'; 

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetMovies = async () => {
      setLoading(true);
      const fetchedMovies = await fetchMovies(searchValue);
      setMovies(fetchedMovies);
      setLoading(false);
    };
    
    fetchAndSetMovies();
  }, [searchValue]);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}>
      <header className="text-center mb-10 py-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold">Movie Recommendations</h1>
      </header>
      
      <main className="relative">
        <section className="container mx-auto px-4">
          <div className="grid gap-6">
            <MovieList movies={movies} loading={loading} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
