import { useState, useEffect, useRef } from 'react';
import '../../.env'
export default function GenreDropdown({ selectedGenre, setSelectedGenre }) {
  const [genres, setGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // const apiKey = process.env.PUBLIC_API_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${PUBLIC_API_KEY}&language=en-US`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
    
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
      >
        Genres
      </button>
      {isOpen && (
        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg border border-gray-300 z-10">
          {genres.length > 0 ? (
            genres.map((genre) => (
              <button 
                key={genre.id} 
                onClick={() => {
                  setSelectedGenre(genre.id);
                  setIsOpen(false);
                }} 
                className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 transition duration-150 ease-in-out"
              >
                {genre.name}
              </button>
            ))
          ) : (
            <p className="block px-4 py-2 text-sm text-gray-700">Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}
