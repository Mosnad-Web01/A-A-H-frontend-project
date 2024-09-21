const MovieDetails = ({ movie, rating, onVibeClick, onAddToList }) => {
  const score =
    movie && movie.vote_average !== null
      ? Math.round(movie.vote_average * 10)
      : rating !== null
        ? Math.round(rating * 10)
        : 0;

  const getScoreColor = (score) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };
  const scoreColorClass = getScoreColor(score);

  if (!movie) {
    return <p className="text-white text-center">Loading...</p>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/default-poster.jpg";

  return (
    <div className="relative min-h-screen bg-[#032541] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${posterUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-85"></div>

      <main className="relative">
        <div className="relative z-10 container mx-auto p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src={posterUrl}
                alt={`${movie.title} Poster`}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-2">
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </h1>
              <p className="text-sm mb-4">
                {movie.release_date} •{" "}
                {movie.genres?.map((g) => g.name).join(", ")} •{" "}
                {movie.runtime} min
              </p>

              <div className="flex items-center mb-4">
                <div
                  className="relative z-50 w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#081c22] mr-1"
                  style={{
                    background: `conic-gradient(${scoreColorClass} ${score}%, #081c22 ${score}%)`,
                  }}
                >
                  <span className="font-bold text-xl text-white">
                    {score}%
                  </span>
                </div>
                <span className="font-semibold">User Score</span>

                <button
                  onClick={onVibeClick}
                  className="ml-4 px-4 py-2 bg-[#063f4e] text-white rounded-3xl hover:bg-[#0190b8] transition"
                >
                  What's your Vibe?
                </button>
                <span className="ml-4 text-sm text-gray-300">
                  Your Rating: {rating}%
                </span>
              </div>

              {/* إضافة الأزرار الأربعة */}
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={onAddToList}
                  className="bg-[#033f57] p-3 rounded-full hover:bg-blue-600 transition"
                  title="Add to My List"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>

                <button
                  className="bg-[#033f57] p-3 rounded-full hover:bg-blue-600 transition"
                  title="Add to Favorites"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>

                <button
                  className="bg-[#033f57] p-3 rounded-full hover:bg-blue-600 transition"
                  title="Watch Later"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3"
                    />
                  </svg>
                </button>

                <button
                  className="bg-[#033f57] p-3 rounded-full hover:bg-blue-600 transition"
                  title="Play Trailer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.752 11.168l-4.752-3v10l4.752-3z"
                    />
                  </svg>
                </button>
              </div>

              <h2 className="text-2xl font-semibold mb-2">Overview</h2>
              <p className="text-lg mb-4">{movie.overview}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetails;
