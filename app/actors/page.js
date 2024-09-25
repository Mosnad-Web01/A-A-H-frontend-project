// app/actors/page.js
"use client"; // Mark this file as a Client Component

import { useEffect, useState } from 'react';
import '../../.env';
import ActorCard from '../../components/ActorCard/ActorCard';


const API_BASEURL = 'https://api.themoviedb.org/3';


export default function Actors() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularActors = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASEURL}/person/popular?api_key=${PUBLIC_API_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        if (data.results) {
          setActors(data.results);
        } else {
          setActors([]); // Safeguard if results are not returned
        }
      } catch (error) {
        console.error('Error fetching actors:', error);
        setActors([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchPopularActors();
  }, []);

  if (loading) return <p className="text-white text-center">Loading actors...</p>;

  return (
    <div className="container mx-auto py-6 bg-background rounded-lg w-full">
      <h1 className="text-3xl font-bold mb-4">Popular Actors</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.isArray(actors) && actors.length > 0 ? (
          actors.map((actor) => (
            <ActorCard key={actor.id} actor={actor} />
          ))
        ) : (
          <p>No actors found.</p> // Handle the case when no actors are found
        )}
      </div>
    </div>
  );
}
