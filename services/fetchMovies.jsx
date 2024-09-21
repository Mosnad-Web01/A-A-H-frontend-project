// generalFetch.js
// Function to fetch movies
import  generateApiUrl  from '../services/generateApiUrl'; // Import the utility function
 
export const fetchMovies = async (query,page) => {
  const normalizedQuery = String(query).trim().toLowerCase();
  console.log(' Featch qurey.id,', query.Id)
  const url = generateApiUrl({
    Id: query.Id,
    category: normalizedQuery ? 'search' : 'popular',
    Page :page,
    query: normalizedQuery,
  });
  console.log('fetach back URL',url);
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson.results || responseJson.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
