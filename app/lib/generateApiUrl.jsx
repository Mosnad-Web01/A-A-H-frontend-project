const PUBLIC_API_KEY = '7945a4965e711e4f191d5e4b9e0274ce';
const baseUrl = 'https://api.themoviedb.org/3/';

// Function to generate a TMDB API URL
const generateApiUrl = ({
  type = 'movie',
  category = 'popular',
  period = 'week',
  lang = 'en-US',
  Page ='1',
  year,
  query,
  Id, // Add movieId parameter to handle specific movie
  queryParams = {}
}) => {

  // Determine the endpoint based on the type, category, and movieId
  let endpoint;
  console.log('queryParams page',queryParams);

  // Check if movieId is provided to get details for a specific movie
  if (Id && Id.trim() !== "") {
    let cendpoint = Id.split('/').filter(Boolean); // تقسيم النص عند كل '/' وتجاهل القيم الفارغة

// استخراج الجزء الأخير من النص (الرقم)
cendpoint = cendpoint[cendpoint.length - 1];

console.log('endpoint:', cendpoint);

// إنشاء endpoint باستخدام الرقم المستخرج
endpoint = `${type}/${cendpoint}`;

console.log('Final endpoint:', endpoint); // النتيجة النهائية "movie/7887"

  } else if (category === 'trending') {
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
  console.log('endpoint before ',endpoint);
  console.log('query before ',query.id);



  // Add search query if applicable
  const queryParamString = [
    ...Object.keys(queryParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`),
    query ? `query=${encodeURIComponent(query)}` : '',
    `api_key=${PUBLIC_API_KEY}`,
    `language=${lang}`,
    `page=${Page}`
    ].filter(Boolean).join('&');

  // Return the full API URL
  console.log(`${baseUrl}${endpoint}?${queryParamString}`);
  return `${baseUrl}${endpoint}?${queryParamString}`;
};

export default generateApiUrl;
