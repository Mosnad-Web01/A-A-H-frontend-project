// app/actors/[id]/page.js
import Image from 'next/image';
import '../../../.env';

// Define the API base URL and key
const API_BASEURL = 'https://api.themoviedb.org/3';
export default async function ActorDetails({ params }) {
  const { id } = params;

  // Fetch actor details from TMDB
  const res = await fetch(`${API_BASEURL}/person/${id}?api_key=${PUBLIC_API_KEY}&language=en-US`);
  const actor = await res.json();

  if (!res.ok) {
    return <p>Actor not found</p>;
  }

  return (
    <div className="container mx-auto py-6 bg-background">
      <h1 className="text-3xl font-bold mb-4">{actor.name}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <Image
            src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/default-actor.jpg'}
            alt={actor.name}
            width={500}
            height={750}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold">Biography</h2>
          <p className="mt-4 text-sm">{actor.biography || 'Biography not available.'}</p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Known for:</h3>
            <p>{actor.known_for_department}</p>
            <p>Birthday: {actor.birthday || 'N/A'}</p>
            {actor.deathday && <p>Deathday: {actor.deathday}</p>}
            <p>Place of Birth: {actor.place_of_birth || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
