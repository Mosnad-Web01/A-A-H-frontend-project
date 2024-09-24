// app/actors/page.js
"use client"; // Mark this file as a Client Component

import { useEffect, useState } from 'react';
import '../../.env';
import ActorCard from '../../components/ActorCard/ActorCard';
import { Box, Heading, SimpleGrid, Text, Spinner } from '@chakra-ui/react';


const API_BASEURL = 'https://api.themoviedb.org/3';


export default function Actors() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularActors = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASEURL}/person/popular?api_key=${PUBLIC_API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        if (data.results) {
          setActors(data.results);
        } else {
          setActors([]); // Safeguard if results are not returned
        }
      } catch (error) {
        console.error('Error fetching actors:', error);
        setActors([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchPopularActors();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={6} bg="background" rounded="lg">
        <Spinner size="lg" color="teal.500" />
        <Text mt={4} fontSize="lg" color="white">
          Loading actors...
        </Text>
      </Box>
    );
  }

  return (
    <Box className="container mx-auto py-6" bg="background" rounded="lg">
    <Heading as="h1" size="xl" mb={4} textAlign="center" color="white">
      Popular Actors
    </Heading>
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
      {Array.isArray(actors) && actors.length > 0 ? (
        actors.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))
      ) : (
        <Text textAlign="center" fontSize="lg" color="red.500" fontWeight="bold">
          No actors found.
        </Text> // Styled no actors found message
      )}
    </SimpleGrid>
  </Box>
  );
}

