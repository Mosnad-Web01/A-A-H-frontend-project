const MovieDetails = ({ movie, rating, onVibeClick, onAddToList }) => {
  if (!movie) {
    return <p className="text-white text-center">Loading...</p>;
  }

  const score = calculateScore(movie.vote_average, rating);
  const scoreColorClass = getScoreColor(score);
  const posterUrl = getPosterUrl(movie.poster_path);

  return (
    <div className="relative min-h-screen bg-[#03254c] text-white">
      <BackgroundImage url={posterUrl} />
      <div className="absolute inset-0 bg-black bg-opacity-85"></div>

      <main className="relative">
        <div className="relative z-10 container mx-auto p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <MoviePoster url={posterUrl} alt={movie.title} />

            <div className="md:w-2/3">
              <MovieHeader movie={movie} />
              <MovieScore
                score={score}
                scoreColorClass={scoreColorClass}
                onVibeClick={onVibeClick}
                rating={rating}
              />
              <ActionButtons onAddToList={onAddToList} />
              <MovieOverview overview={movie.overview} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper functions
const calculateScore = (voteAverage, rating) => {
  return voteAverage !== null
    ? Math.round(voteAverage * 10)
    : rating !== null
    ? Math.round(rating * 10)
    : 0;
};

const getScoreColor = (score) => {
  if (score >= 70) return "bg-green-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

const getPosterUrl = (posterPath) => {
  return posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "/default-poster.jpg";
};

// Reusable components
const BackgroundImage = ({ url }) => (
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url(${url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  ></div>
);

const MoviePoster = ({ url, alt }) => (
  <div className="md:w-1/3">
    <img
      src={url}
      alt={`${alt} Poster`}
      className="w-full rounded-lg shadow-lg"
    />
  </div>
);

const MovieHeader = ({ movie }) => (
  <>
    <h1 className="text-4xl font-bold mb-2">
      {movie.title} ({new Date(movie.release_date).getFullYear()})
    </h1>
    <p className="text-sm mb-4">
      {movie.release_date} • {movie.genres?.map((g) => g.name).join(", ")} •{" "}
      {movie.runtime} min
    </p>
  </>
);

const MovieScore = ({ score, scoreColorClass, onVibeClick, rating }) => (
  <div className="flex items-center mb-4">
    <div
      className="relative z-50 w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#081c22] mr-1"
      style={{
        background: `conic-gradient(${scoreColorClass} ${score}%, #081c22 ${score}%)`,
      }}
    >
      <span className="font-bold text-xl text-white">{score}%</span>
    </div>
    <span className="font-semibold">User Score</span>

    <button
      onClick={onVibeClick}
      className="ml-4 px-4 py-2 bg-[#063f4e] text-white rounded-3xl hover:bg-[#0190b8] transition"
    >
      What's your Vibe?
    </button>
    <span className="ml-4 text-sm text-gray-300">Your Rating: {rating}%</span>
  </div>
);

const ActionButtons = ({ onAddToList }) => (
  <div className="flex space-x-4 mb-4">
    <ActionButton onClick={onAddToList} title="Add to My List" icon="M12 4v16m8-8H4" />
    <ActionButton title="Add to Favorites" icon="M5 13l4 4L19 7" />
    <ActionButton title="Watch Later" icon="M12 8v4l3 3" />
    <ActionButton title="Play Trailer" icon="M14.752 11.168l-4.752-3v10l4.752-3z" />
  </div>
);

const ActionButton = ({ onClick, title, icon }) => (
  <button
    onClick={onClick}
    className="bg-[#033f57] p-3 rounded-full hover:bg-blue-600 transition"
    title={title}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
    </svg>
  </button>
);

const MovieOverview = ({ overview }) => (
  <>
    <h2 className="text-2xl font-semibold mb-2">Overview</h2>
    <p className="text-lg mb-4">{overview}</p>
  </>
);

export default MovieDetails;
