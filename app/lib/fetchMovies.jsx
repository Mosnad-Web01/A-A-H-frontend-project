// generalFetch.js
// Function to fetch movies
import  generateApiUrl  from '../lib/generateApiUrl'; // Import the utility function
 
export const fetchMovies = async (query) => {
  const normalizedQuery = query.trim().toLowerCase();
  const url = generateApiUrl({
    type: 'movie',
    category: normalizedQuery ? 'search' : 'popular',
    query: normalizedQuery
  });
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson.results || responseJson.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
