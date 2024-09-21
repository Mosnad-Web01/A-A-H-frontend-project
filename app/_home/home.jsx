// pages/home.js
'use client';

import React from 'react';
import MovieListHeading from '../../components/Movies/MovieListHeading';
import SearchBox from '../../components/Movies/SearchBox';
import MovieList from '../../components/Movies/MovieList';
import HomeContainer from '../../containers/homeContainer'; // Import the logic

const Home = () => {
  const { searchValue, handleSearch, movies, hasMore, handleLoadMore } = HomeContainer();

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
