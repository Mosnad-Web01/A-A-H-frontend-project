import generateApiUrl from "./generateApiUrl";

export const fetchMovies = async (selectedGenre = null) => {
    let url;
  
    if (selectedGenre) {
        console.log('Fetching movies by genre:', selectedGenre); 
        url = generateApiUrl({
          category: 'genre', 
          genre: selectedGenre, 
        });
      } else {
        console.log("No genre selected, fetching popular movies");
        url = generateApiUrl({
          category: 'popular',
        });
      }
    
      console.log('Generated URL:', url); 
    
      try {
        const response = await fetch(url);
        const responseJson = await response.json();
        const results = responseJson.results || responseJson.Search || [];
        return results;
      } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
      }
    };
  
  

const fetchDefaultMovies = async (page) => {
  const url = generateApiUrl({
    category: 'popular', // Fetch popular movies
    Page: page,
  });

  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson.results || [];
  } catch (error) {
    console.error("Error fetching default movies:", error);
    return [];
  }
};

// Function to filter movies by selected genres
const filterByGenres = (movies, selectedGenres) => {
  return movies.filter(movie => {
    const movieGenres = movie.genres || []; 
    return selectedGenres.every(genre => movieGenres.includes(genre)); 
  });
};

export const fetchGenres = async (genre) => {
  try {
    const response = await fetch(`/api/movies?genre=${genre}`);
    const data = await response.json();
    return data.movies;
  } catch (error) {
    console.error('Failed to fetch movies by genre:', error);
    return [];
  }
};
