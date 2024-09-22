import Link from 'next/link';

export default function MovieMenu() {
  const options = ['Top Rated', 'Popular', 'Latest', 'Now Playing', 'Upcoming'];

  return (
    <div className="relative group">
      <button className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out">
        Movies
      </button>
      <div className="absolute hidden group-hover:block bg-gray-800 text-white mt-2 rounded shadow-lg z-10">
        {options.map((option) => (
          <Link key={option} href={`/movies/${option.toLowerCase().replace(' ', '-')}`} legacyBehavior>
            <a className="block px-4 py-2 hover:bg-gray-700 transition duration-150 ease-in-out">
              {option}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
