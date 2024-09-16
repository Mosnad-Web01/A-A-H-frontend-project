
const MovieList = (props) => {
  return (
    
    <>
      {props.movies.map((movie, index) => (
        <article
        
          key={index}
          className='bg-gray-800 p-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out'
        >
          <figure>
            <img
              src={movie.Poster}
              alt={`${movie.Title} Poster`}
              className='w-full h-72 object-cover rounded-md'
            />
            <figcaption className='text-white text-center mt-4'>{movie.Title}</figcaption>
          </figure>
        </article>
      ))}
    </>
  );
};

export default MovieList;
