'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Button,
  FormControl,
  HStack,
  Spinner,
  useColorMode,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import SearchBox from './SearchBox';
import MovieMenu from './MovieMenu';
import AuthLinks from './AuthLinks';

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const fetchMovies = async () => {
    if (!searchValue) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/movies?query=${encodeURIComponent(searchValue)} || ''}`);
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      // Process the fetched data if needed
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchValue]);

  // Responsive styles for button
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Box as="nav" bg={colorMode === 'dark' ? 'gray.800' : 'gray.200'} py={4} shadow="md">
      <Box maxW="container.xl" mx="auto" px={4}>
        <Flex align="center" justify="space-between" flexWrap="wrap">
          {/* Logo Section */}
          <Heading size="lg" fontWeight="bold" color={colorMode === 'dark' ? 'white' : 'black'}>
            <Link href="/" passHref>
              TMDb
            </Link>
          </Heading>

          {/* Dropdowns and Buttons */}
          <HStack spacing={4} mb={{ base: 4, md: 0 }}>
            <Link href="/movies" passHref>
            Movies
            </Link>     

            <Link href="/actors" passHref>
              <Button
                variant="solid"
                colorScheme="teal"
                size={buttonSize}
                className="transition duration-300 ease-in-out transform hover:bg-teal-400 hover:scale-105"
                _active={{ bg: 'teal.600' }}
              >
                Actors
              </Button>
            </Link>
          </HStack>

          {/* Search Box */}
          <FormControl maxW="300px" mb={{ base: 4, md: 0 }}>
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
          </FormControl>

          {/* Authentication Links */}
          <AuthLinks />

          {/* Theme Toggle Button */}
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            variant="outline"
            colorScheme="teal"
            size="sm"
            className="transition duration-300 ease-in-out transform hover:scale-105"
          />
        </Flex>

        {/* Loader */}
        {loading && (
          <HStack justify="center" mt={4}>
            <Spinner size="md" color="red.500" />
          </HStack>
        )}
      </Box>
    </Box>
  );
}
