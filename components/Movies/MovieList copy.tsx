import Link from 'next/link';

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <p className='text-white text-center'>No movies found</p>;
  }

  return (
    <>
      {movies.map((movie) => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          
          <article
            className='bg-gray-800 p-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer'
          >
            <figure>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150x225?text=No+Poster'}
                alt={`${movie.title} Poster`}
                className='w-full h-72 object-cover rounded-md'
              />
              <figcaption className='text-white text-center mt-4'>{movie.title}</figcaption>
            </figure>
          </article>
        </Link>
      ))}
    </>
  );
};

export default MovieList;
