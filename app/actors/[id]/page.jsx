"use client"; 

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../../.env';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
const API_BASEURL = 'https://api.themoviedb.org/3';

export default function ActorDetails({ params: { id } }) {
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullBiography, setShowFullBiography] = useState(false);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const res = await fetch(
          `${API_BASEURL}/person/${id}?api_key=${PUBLIC_API_KEY}&language=en-US&append_to_response=external_ids,movie_credits`
        );
        if (!res.ok) throw new Error("Failed to fetch actor details");
        const data = await res.json();
        setActor(data);
      } catch (error) {
        console.error('Error fetching actor details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchActorDetails();
  }, [id]);

  if (loading) return <p>Loading actor details...</p>;
  if (!actor) return <p>No actor found.</p>;

  const biographyMaxLength = 300;
  const isBiographyLong = actor.biography && actor.biography.length > biographyMaxLength;

  const displayedBiography = isBiographyLong && !showFullBiography
    ? actor.biography.slice(0, biographyMaxLength) + '…'
    : actor.biography || 'No biography available.';

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Actor Image */}
      <div className="flex-shrink-0">
        <Image
          src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/default-actor.jpg'}
          alt={actor.name}
          width={300}
          height={450}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Actor Info */}
      <div className="flex-grow">
        <h1 className="text-4xl font-bold mb-4">{actor.name}</h1>

        {/* Biography */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Biography</h2>
          <p className="text-lg">{displayedBiography}</p>
          {isBiographyLong && (
            <button
              onClick={() => setShowFullBiography(!showFullBiography)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              {showFullBiography ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Social Media Links */}
        {actor.external_ids && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Follow on Social Media</h2>
            <div className="flex items-center gap-4">
              {actor.external_ids.instagram_id ? (
                <a
                  href={`https://instagram.com/${actor.external_ids.instagram_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  <FaInstagram size={20} />
                  Instagram
                </a>
              ) : (
                <p className="text-gray-500">Instagram link not available</p>
              )}

              {actor.external_ids.twitter_id ? (
                <a
                  href={`https://twitter.com/${actor.external_ids.twitter_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  <FaTwitter size={20} />
                  Twitter
                </a>
              ) : (
                <p className="text-gray-500">Twitter link not available</p>
              )}

              {actor.external_ids.facebook_id ? (
                <a
                  href={`https://facebook.com/${actor.external_ids.facebook_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  <FaFacebook size={20} />
                  Facebook
                </a>
              ) : (
                <p className="text-gray-500">Facebook link not available</p>
              )}
            </div>
          </div>
        )}

        {/* Known For */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Known For</h2>
          <div className="flex overflow-x-auto space-x-4">
            {actor.movie_credits?.cast.slice(0, 6).map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-40">
                <Link key={movie.id} href={`/movie/${movie.id}`} passHref>
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    width={160}
                    height={240}
                    className="rounded-lg shadow-md"
                  />
                  <p className="text-center mt-2 text-sm font-medium">
                    {movie.title} ({new Date(movie.release_date).getFullYear()})
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
