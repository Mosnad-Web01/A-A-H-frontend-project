import { Box, Image, Heading, Text, Flex } from '@chakra-ui/react';
import '../../../.env';

const API_BASEURL = 'https://api.themoviedb.org/3';

export default async function ActorDetails({ params }) {
  const { id } = params;

  // Fetch actor details from TMDB
  const res = await fetch(`${API_BASEURL}/person/${id}?api_key=${PUBLIC_API_KEY}&language=en-US`);
  const actor = await res.json();

  if (!res.ok) {
    return <Text color="red.500" textAlign="center">Actor not found</Text>;
  }

  return (
    <Box 
      mx="auto" 
      py={6} 
      px={4} 
      maxW="7xl"
      bg="background.light" 
      rounded="lg" 
      boxShadow="md"
    >
      <Heading as="h1" size="xl" mb={4} textAlign="center" color="primary.500">
        {actor.name}
      </Heading>
      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <Box w={{ base: 'full', md: '33%' }} textAlign="center">
          <Image
            src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/default-actor.jpg'}
            alt={actor.name}
            borderRadius="lg"
            boxSize="full"
            objectFit="cover"
          />
        </Box>
        <Box w={{ base: 'full', md: '67%' }}>
          <Heading as="h2" size="lg" mb={4} color="primary.600">
            Biography
          </Heading>
          <Text mb={6} fontSize="md" color="text.light">
            {actor.biography || 'Biography not available.'}
          </Text>
          <Box>
            <Heading as="h3" size="md" mb={2} color="primary.700">
              Known for:
            </Heading>
            <Text fontSize="md" mb={2} color="text.dark">{actor.known_for_department || 'N/A'}</Text>
            <Text fontSize="md" mb={2} color="text.dark">Birthday: {actor.birthday || 'N/A'}</Text>
            {actor.deathday && (
              <Text fontSize="md" mb={2} color="text.dark">Deathday: {actor.deathday}</Text>
            )}
            <Text fontSize="md" mb={2} color="text.dark">Place of Birth: {actor.place_of_birth || 'N/A'}</Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
