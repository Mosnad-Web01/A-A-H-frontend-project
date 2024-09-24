import Link from 'next/link';
import { Box, Image, Text, Heading, useColorModeValue } from '@chakra-ui/react';

export default function ActorCard({ actor }) {
  const actorImage = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : '/default-actor.jpg'; // Placeholder image for actors without a picture

  // Use color mode values for background, text, and other properties
  const cardBg = useColorModeValue('gray.300', 'gray.900'); // Card background color
  const headingColor = useColorModeValue('gray.800', 'white'); // Heading color
  const textColor = useColorModeValue('gray.600', 'gray.300'); // Text color
  const linkColor = useColorModeValue('blue.500', 'blue.400'); // Link color

  return (
    <Box 
      bg={cardBg} 
      shadow="md" 
      rounded="lg" 
      p={4}
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: 'scale(1.05)' }} // Scale effect on hover
    >
      <Image
        src={actorImage}
        alt={actor.name}
        borderRadius="lg"
        objectFit="cover"
        boxSize="full" // Makes the image fill the box
        h="64" // Set a fixed height
      />
      <Heading as="h2" size="md" mt={2} color={headingColor}>
        {actor.name}
      </Heading>
      <Text fontSize="sm" color={textColor}>
        Popularity: {actor.popularity.toFixed(1)}
      </Text>
      <Link href={`/actors/${actor.id}`}>
        <Text 
          mt={3} 
          color={linkColor} 
          textDecoration="underline" 
          _hover={{ color: 'blue.500' }} // Change color on hover
        >
          View Details
        </Text>
      </Link>
    </Box>
  );
}
