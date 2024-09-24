// pages/actor/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../../../.env';

const API_BASEURL = 'https://api.themoviedb.org/3';

export default function SingleActor() {
  const router = useRouter();
  const { id } = router.query;

  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchActorDetails = async () => {
      setLoading(true);
      const res = await fetch(
        `${API_BASEURL}/person/${id}?api_key=${PUBLIC_API_KEY}&language=en-US`
      );
      const data = await res.json();
      setActor(data);
      setLoading(false);
    };

    fetchActorDetails();
  }, [id]);

  if (loading) return <p>Loading actor details...</p>;
  if (!actor) return <p>No actor found</p>;

  const actorImage = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : '/default-actor.jpg';

  return (
    <div className="container mx-auto py-6 bg-background rounded-lg">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={actorImage}
          alt={actor.name}
          className="w-64 h-64 object-cover rounded-lg"
        />
        <div className="ml-4">
          <h1 className="text-4xl font-bold">{actor.name}</h1>
          <p className="text-lg">Gender: {actor.gender === 1 ? 'Female' : 'Male'}</p>
          <p className="text-lg">Popularity: {actor.popularity.toFixed(1)}</p>
          <p className="text-lg">Birthday: {actor.birthday || 'Unknown'}</p>
          <p className="mt-4">{actor.biography || 'No biography available'}</p>
        </div>
      </div>
    </div>
  );
}
