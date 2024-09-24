import { Box, Flex, Image, Heading, Text, Button, CircularProgress, Stack } from '@chakra-ui/react';

const MovieDetails = ({ movie, rating, onVibeClick, onAddToList }) => {
  const score =
    movie && movie.vote_average !== null
      ? Math.round(movie.vote_average * 10)
      : rating !== null
        ? Math.round(rating * 10)
        : 0;

  const getScoreColor = (score) => {
    if (score >= 70) return "green.500";  // Chakra color
    if (score >= 50) return "yellow.500"; // Chakra color
    return "red.500";                     // Chakra color
  };
  
  const scoreColorClass = getScoreColor(score);

  if (!movie) {
    return <Text color="white" textAlign="center">Loading...</Text>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/default-poster.jpg";

  return (
    <Box 
      position="relative" 
      minH="100vh" 
      bg="#032541" 
      color="white"
    >
      <Box 
        position="absolute" 
        inset={0} 
        bgImage={`url(${posterUrl})`} 
        bgSize="cover" 
        bgPosition="center"
        filter="blur(8px)"
      />
      <Box 
        position="absolute" 
        inset={0} 
        bg="black" 
        opacity={0.85} 
      />

      <Box position="relative" zIndex={1}>
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          gap={8} 
          p={8}
          maxW="container.xl" 
          mx="auto"
        >
          <Box flexBasis={{ base: '100%', md: '30%' }}>
            <Image
              src={posterUrl}
              alt={`${movie.title} Poster`}
              borderRadius="lg"
              boxShadow="lg"
            />
          </Box>

          <Box flexBasis={{ base: '100%', md: '70%' }}>
            <Heading size="xl" mb={2}>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </Heading>
            <Text fontSize="sm" mb={4}>
              {movie.release_date} •{" "}
              {movie.genres?.map((g) => g.name).join(", ")} •{" "}
              {movie.runtime} min
            </Text>

            <Flex alignItems="center" mb={4}>
              <Box 
                position="relative" 
                width="64px" 
                height="64px" 
                borderRadius="full" 
                border={`4px solid #081c22`} 
                mr={2}
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                background={`conic-gradient(${scoreColorClass} ${score}%, #081c22 ${score}%)`}
              >
                <Text fontWeight="bold" fontSize="xl" color="white">
                  {score}%
                </Text>
              </Box>
              <Text fontWeight="semibold">User Score</Text>

              <Button
                onClick={onVibeClick}
                colorScheme="teal"
                variant="solid"
                ml={4}
              >
                Whats your Vibe?
              </Button>
              <Text ml={4} fontSize="sm" color="gray.300">
                Your Rating: {rating}%
              </Text>
            </Flex>

            <Stack direction="row" spacing={4} mb={4}>
              <Button 
                onClick={onAddToList} 
                colorScheme="blue" 
                variant="solid" 
                rounded="full" 
                title="Add to My List"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </Button>

              <Button 
                colorScheme="blue" 
                variant="solid" 
                rounded="full" 
                title="Add to Favorites"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </Button>

              <Button 
                colorScheme="blue" 
                variant="solid" 
                rounded="full" 
                title="Watch Later"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3"
                  />
                </svg>
              </Button>

              <Button 
                colorScheme="blue" 
                variant="solid" 
                rounded="full" 
                title="Play Trailer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-4.752-3v10l4.752-3z"
                  />
                </svg>
              </Button>
            </Stack>

            <Heading size="lg" mb={2}>Overview</Heading>
            <Text fontSize="lg" mb={4}>{movie.overview}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default MovieDetails;
