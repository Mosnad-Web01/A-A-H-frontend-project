'use client'

import { Box, Text, Image, Button, Stack, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Movies = () => {
  const router = useRouter();
  const { id } = router.query; // Get movie ID from the URL
  const [movie, setMovie] = useState(null);
  const textColor = useColorModeValue('text.light', 'text.dark');
  const bgColor = useColorModeValue('primary.100', 'primary.800');

  useEffect(() => {
    if (id) {
      // Fetch movie details from an API
      const fetchMovie = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`);
        const data = await response.json();
        setMovie(data);
      };
      fetchMovie();
    }
  }, [id]);

  if (!movie) {
    return <Text color={textColor} textAlign="center">Loading...</Text>;
  }

  return (
    <Box as="section" p={4} bg={bgColor}>
      <Stack spacing={4}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Image
            width={220}
            height={330}
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150x225?text=No+Poster'}
            alt={`${movie.title} Poster`}
            borderRadius="md"
          />
          <Box ml={4} flex="1">
            <Text as="h2" fontSize="2xl" fontWeight="bold" color={textColor}>
              {movie.title || "Unknown Title"}
            </Text>
            <Text fontSize="lg" color="gray.500">
              {new Date(movie.release_date).toLocaleDateString()} | Rating: {movie.vote_average?.toFixed(1)}/10
            </Text>
            <Text mt={2} color={textColor}>
              {movie.overview || "No description available."}
            </Text>
            <Button mt={4} colorScheme="teal" onClick={() => window.history.back()}>
              Back to Movie List
            </Button>
          </Box>
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="semibold" color={textColor}>Cast:</Text>
          <Stack spacing={2}>
            {movie.cast && movie.cast.map((member) => (
              <Text key={member.id} color={textColor}>
                {member.name} as {member.character}
              </Text>
            ))}
          </Stack>
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="semibold" color={textColor}>Reviews:</Text>
          <Stack spacing={2}>
            {movie.reviews && movie.reviews.length > 0 ? (
              movie.reviews.map((review) => (
                <Box key={review.id} borderWidth="1px" borderRadius="md" p={2}>
                  <Text fontWeight="bold" color={textColor}>{review.author}</Text>
                  <Text color={textColor}>{review.content}</Text>
                </Box>
              ))
            ) : (
              <Text color={textColor}>No reviews available.</Text>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Movies;
