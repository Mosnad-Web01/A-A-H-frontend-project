// containers/home-page.js
import { useState, useEffect } from 'react';
import { fetchMovies } from  '../services/fetchMovies'; 

const HomeContainer = () => {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getMovies = async (searchValue, page) => {
    try {
      const moviesData = await fetchMovies(searchValue, page);
      if (moviesData.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prevMovies) => (page === 1 ? moviesData : [...prevMovies, ...moviesData]));
        setFilteredMovies((prevMovies) => (page === 1 ? moviesData : [...prevMovies, ...moviesData]));
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    getMovies(searchValue, page);
  }, [searchValue, page]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setPage(1);
    setHasMore(true);
    setMovies([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return {
    searchValue,
    handleSearch,
    movies,
    hasMore,
    handleLoadMore,
  };
};

export default HomeContainer;
