const baseUrl = 'https://api.themoviedb.org/3/';
import '../.env';

const generateApiUrl = ({
  type = 'movie',
  genre,
  category = 'popular',
  period = 'week',
  lang = 'en-US',
  year,
  query,
  queryParams = {}
  }) => {
  // Determine the endpoint based on the category and type
  const endpoints = {
    trending: `${type}/trending/${period}`,
    genre: `discover/${type}`, // New case for genres
    search: `search/${type}`,
    popular: `${type}/popular`
  };

  const endpoint = year
    ? `${type}/${year}/popular`
    : endpoints[category] || endpoints.popular;
  
  // Create query parameters
  const params = new URLSearchParams({
    api_key: PUBLIC_API_KEY,
    language: lang,
    ...(query && { query }), // Include query if it exists
    ...(genre && { with_genres: genre }), // Include genre if it's provided
    ...queryParams
  });

  // Return the full API URL
  const apiUrl = `${baseUrl}${endpoint}?${params.toString()}`;
  console.log(apiUrl); // For debugging
  return apiUrl;
};

export default generateApiUrl;
