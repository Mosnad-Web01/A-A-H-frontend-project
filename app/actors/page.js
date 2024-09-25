"use client"; // Mark this file as a Client Component

import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link for navigation
import '../../.env';
import ActorCard from '../../components/ActorCard/ActorCard';


const API_BASEURL = 'https://api.themoviedb.org/3';

export default function Actors() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Page state
  const [hasMore, setHasMore] = useState(true); // To track if more actors are available
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const pagesToShow = 3; // Number of page buttons to show

  useEffect(() => {
    const fetchPopularActors = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASEURL}/person/popular?api_key=${PUBLIC_API_KEY}&language=en-US&page=${page}`
        );
        const data = await res.json();
        if (data.results) {
          setActors(data.results); // Update with current page actors
          setTotalPages(data.total_pages); // Set total pages
          setHasMore(data.page < data.total_pages); // Check if there are more pages
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching actors:', error);
        setHasMore(false);
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

