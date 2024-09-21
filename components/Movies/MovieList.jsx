import Link from 'next/link';
import Image from "next/image";


const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p className='text-white text-center'>No movies found</p>;
  }

  const handleMovieClick = (movie) => {
    // تخزين تفاصيل الفيلم في localStorage

    localStorage.setItem('selectedMovie', JSON.stringify(movie));
    

  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 p-4">


      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>

          <article
            className='bg-gray-800 p-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer'
            onClick={() => handleMovieClick(movie)}  // حفظ تفاصيل الفيلم عند الضغط عليه
          >
            <figure>
              <Image
                width={220} 
                height={330} 
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150x225?text=No+Poster'}
                alt={`${movie.title} Poster`}
                className='w-full h-72 object-cover rounded-md'
                priority={false}
              />
            </figure>
            <figcaption className="text-white text-center mt-4">
            <h3 className="text-lg font-semibold truncate max-w-full">
              {movie.title || "Unknown Title"}
            </h3>
            {movie.release_date && (
              <p className="text-sm text-gray-400">
                Release Date:{" "}
                {new Date(movie.release_date).toLocaleDateString()}
              </p>
            )}
            {movie.vote_average && (
              <p className="text-sm text-yellow-400">
                Rating: {movie.vote_average.toFixed(1)}/10
              </p>
            )}
          </figcaption>
          </article>
        </Link>
       ))}
    </div>
  );
};

export default MovieList;
