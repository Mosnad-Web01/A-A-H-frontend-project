import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Flex, Image, Heading, Text, Spinner } from '@chakra-ui/react';
import '../../../.env';

const API_BASEURL = 'https://api.themoviedb.org/3';

export default function SingleActor() {
  const router = useRouter();
  const { id } = router.query;

  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchActorDetails = async () => {
      setLoading(true);
      const res = await fetch(
        `${API_BASEURL}/person/${id}?api_key=${PUBLIC_API_KEY}&language=en-US`
      );
      const data = await res.json();
      setActor(data);
      setLoading(false);
    };

    fetchActorDetails();
  }, [id]);

  if (loading) return <Spinner size="xl" color="primary.500" thickness="4px" speed="0.65s" />;
  if (!actor) return <Text color="red.500" textAlign="center">No actor found</Text>;

  const actorImage = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : '/default-actor.jpg';

  return (
    <Box 
      maxW="7xl" 
      mx="auto" 
      py={8} 
      px={6} 
      bg="background.light" 
      rounded="lg" 
      boxShadow="md"
    >
      <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={6}>
        <Image
          src={actorImage}
          alt={actor.name}
          borderRadius="lg"
          boxSize="256px" // Fixed size for the image
          objectFit="cover"
          shadow="lg"
        />
        <Box>
          <Heading as="h1" size="xl" color="primary.600" mb={4}>
            {actor.name}
          </Heading>
          <Text fontSize="lg" mb={2} color="text.dark">
            Gender: {actor.gender === 1 ? 'Female' : 'Male'}
          </Text>
          <Text fontSize="lg" mb={2} color="text.dark">
            Popularity: {actor.popularity.toFixed(1)}
          </Text>
          <Text fontSize="lg" mb={2} color="text.dark">
            Birthday: {actor.birthday || 'Unknown'}
          </Text>
          <Text fontSize="md" mt={4} color="text.light">
            {actor.biography || 'No biography available'}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
