import Link from 'next/link';

export default function ActorCard({ actor }) {
  const actorImage = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : '/default-actor.jpg'; // Placeholder image for actors without a picture

  return (
    <div className="bg-gray-900 shadow-md rounded-lg p-4">    
      <img
        src={actorImage}
        alt={actor.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="mt-2 text-xl font-bold">{actor.name}</h2>
      <p className="text-sm">Popularity: {actor.popularity.toFixed(1)}</p>
      
      <Link href={`/actors/${actor.id}`} className="mt-3 inline-block text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
}
