// Navbar.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBox from '../Movies/SearchBox';
import GenreDropdown from './GenreDropdown';
import MovieMenu from './MovieMenu';
import AuthLinks from './AuthLinks';

export default function Navbar() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (searchTerm, genreId) => {
    if (!searchTerm) return [];
    
    try {
      const response = await fetch(`/api/movies?query=${encodeURIComponent(searchTerm)}&genre=${genreId || ''}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      return data.movies;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAndSetMovies = async () => {
      setLoading(true);
      try {
        const fetchedMovies = await fetchMovies(searchValue, selectedGenre);
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAndSetMovies();
  }, [searchValue, selectedGenre]);

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold hover:text-red-500 transition-colors">TMDb</a>
          </Link>
        </div>

        <GenreDropdown selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />

        <MovieMenu />

        <Link href="/actors" legacyBehavior>
          <a className="text-white px-4 py-2">Actors</a>
        </Link>

        <form>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        </form>

        <AuthLinks />
      </div>
    </nav>
  );
}