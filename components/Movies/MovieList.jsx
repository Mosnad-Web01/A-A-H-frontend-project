import Link from 'next/link';
import Image from "next/image";
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const MovieList = ({ movies }) => {
  // These values will change based on the current color mode
  const textColor = useColorModeValue('text.light', 'text.dark');
  const bgColor = useColorModeValue('gray.200', 'primary.800');
  const secondaryColor = useColorModeValue('secondary.light', 'secondary.dark');

  if (!movies || movies.length === 0) {
    return <Text color={textColor} textAlign="center">No movies found</Text>;
  }

  const handleMovieClick = (movie) => {
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
  };

  return (
    <Box 
      as="section" 
      overflowX="auto" 
      whiteSpace="nowrap" 
      p={4} 
      display="flex" 
      gap={4} // Space between movie cards
      sx={{ 
        scrollBehavior: 'smooth', // Enable smooth scrolling
        scrollbarWidth: 'thin', // For Firefox (optional)
        '&::-webkit-scrollbar': { // Custom scrollbar for WebKit browsers
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'gray.400',
          borderRadius: '8px',
        },
      }}
    >
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`} passHref>
          <Box
            as="article"
            bg={bgColor} // Background color based on theme
            p={3}
            rounded="lg"
            shadow="lg"
            transition="transform 0.3s ease-in-out" // Animation on hover
            _hover={{ transform: 'scale(1.05)', bg: secondaryColor }} // Change background on hover
            cursor="pointer"
            onClick={(e) => {
              handleMovieClick(movie);
              e.stopPropagation(); // Prevents the event from bubbling up
            }}
            display="inline-block" // Important for horizontal scrolling
            minWidth="220px" // Ensure cards have a minimum width
            
          >
            <Box as="figure" >
              <Image
                width={220} 
                height={330} 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150x225?text=No+Poster'}
                alt={`${movie.title} Poster`}
                className='w-full h-72 object-cover rounded-md'
                priority={false}
              />
            </Box>
            <Box as="figcaption" color={textColor} textAlign="center" mt={4}>
              <Text as="h3" fontSize="lg" fontWeight="semibold" isTruncated>
                {movie.title || "Unknown Title"}
              </Text>
              {movie.release_date && (
                <Text fontSize="sm" color="gray.400">
                  {new Date(movie.release_date).toLocaleDateString()}
                </Text>
              )}
              {movie.vote_average && (
                <Text fontSize="sm" color="yellow.400">
                  Rating: {movie.vote_average.toFixed(1)}/10
                </Text>
              )}
            </Box>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default MovieList;
