const PUBLIC_API_KEY = '7945a4965e711e4f191d5e4b9e0274ce';
const baseUrl = 'https://api.themoviedb.org/3/';

// Function to generate a TMDB API URL
const generateApiUrl = ({
  type = 'movie',
  category = 'popular',
  period = 'week',
  lang = 'en-US',
  year,
  query,
  queryParams = {}
}) => {
  // Determine the endpoint based on the type and category
  let endpoint;

  if (category === 'trending') {
    endpoint = `${type}/trending/${period}`;
  } else if (category === 'search') {
    endpoint = `search/${type}`;
  } else if (category === 'popular') {
    endpoint = `${type}/popular`;
  } else if (type === 'movie' && year) {
    endpoint = `movie/${year}/popular`;
  } else if (type === 'tv' && year) {
    endpoint = `tv/${year}/popular`;
  } else {
    endpoint = `${type}/popular`;
  }

  // Add search query if applicable
  const queryParamString = [
    ...Object.keys(queryParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`),
    query ? `query=${encodeURIComponent(query)}` : '',
    `api_key=${PUBLIC_API_KEY}`,
    `language=${lang}`
  ].filter(Boolean).join('&');

  // Return the full API URL
  console.log(`${baseUrl}${endpoint}?${queryParamString}`);
  return `${baseUrl}${endpoint}?${queryParamString}`;
};

export default generateApiUrl;
