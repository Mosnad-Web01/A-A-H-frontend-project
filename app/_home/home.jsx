'use client';

import React, { useState, useEffect } from 'react';
import { Box, Heading, Spinner, Container, Button, Stack, useColorModeValue } from '@chakra-ui/react';
import MovieList from '../../components/Movies/MovieList';
import { fetchMovies } from '../../services/fetchMovies';
import SearchBox from '../../components/Movies/SearchBox';

const genres = ['Action', 'Comedy', 'Drama', 'Horror'];
const genreIds = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
 
}; 

const Home = () => {
  const [movies, setMovies] = useState([]);         
  const [selectedGenre, setSelectedGenre] = useState(null); 
  const [loading, setLoading] = useState(true);   
  const [searchValue, setSearchValue] = useState('');   
  // Fetch movies based on selected genre
  useEffect(() => {
    const fetchAndSetMovies = async () => {
      setLoading(true); 
      console.log('Fetching movies for genre:', selectedGenre); 
      const fetchedMovies = await fetchMovies(selectedGenre);
      setMovies(fetchedMovies);
      setLoading(false); 
    };

    fetchAndSetMovies();
  }, [selectedGenre]); 

  
  const bgColor = useColorModeValue('background.light', 'background.dark');
  const textColor = useColorModeValue('text.light', 'text.dark');

  return (
    <Box
      position="relative"
      minH="100vh"
      bg={bgColor}
      color={textColor}
      bgImage="url(/path/to/your/background-image.jpg)"
      bgSize="cover"
      bgPosition="center"
    >
      <Box textAlign="center" mb={10} py={8} borderRadius="lg" boxShadow="lg">
        <Heading as="h1" size="xl" fontWeight="semibold" bg={bgColor} color={textColor}>
          Movie Recommendations
        </Heading>
      </Box>
        <Box >
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        </Box>
      <Box position="relative">
        <Container maxW="container.xl" px={4}>

          {/* Genre Buttons */}
          <Stack direction="row" spacing={4} justify="center" mb={8}>
            {genres.map((genre) => (
              <Button
                key={genre}
                colorScheme={selectedGenre === genre ? 'teal' : 'gray'}
                onClick={() => {
                  const genreId = genreIds[genre]; 
                  console.log(`Selected genre ID: ${genreId}`);
                  setSelectedGenre(genreId); 
                }}
              >
                {genre}
              </Button>
            ))}
          </Stack>


          {/* Display Movie List or Spinner */}
          {loading ? (
            <Spinner size="lg" color="teal.500" />
          ) : (
            <Box display="grid" gap={6}>
              <MovieList movies={movies} /> 
            </Box>
          )}

        </Container>
      </Box>
    </Box>
  );
};

export default Home;
