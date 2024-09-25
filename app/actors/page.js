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
  }, [page]); // Trigger fetch when page changes

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
  };

  // Function to render page numbers with ellipsis
  const renderPageNumbers = () => {
    const pages = [];

    // Always show the first page
    pages.push(
      <button
        key={1}
        onClick={() => handlePageClick(1)}
        className={`${
          page === 1 ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-bold py-2 px-4 rounded-lg`}
      >
        1
      </button>
    );

    // Show ellipsis if necessary
    if (page > pagesToShow) {
      pages.push(
        <span key="ellipsis-start" className="text-white px-2">
          ...
        </span>
      );
    }

    // Show pages around the current page
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`${
            page === i ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-bold py-2 px-4 rounded-lg`}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis before the last page if necessary
    if (page < totalPages - pagesToShow) {
      pages.push(
        <span key="ellipsis-end" className="text-white px-2">
          ...
        </span>
      );
    }

    // Always show the last page if there are multiple pages
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`${
            page === totalPages ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-bold py-2 px-4 rounded-lg`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="container mx-auto py-6 bg-background rounded-lg w-full">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Popular Actors</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.isArray(actors) && actors.length > 0 ? (
          actors.map((actor) => (
            <Link key={actor.id} href={`/actors/${actor.id}`} passHref>
              <div>
                <ActorCard actor={actor} />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-white">No actors found.</p>
        )}
      </div>

      {loading ? (
        <p className="text-white text-center mt-4">Loading actors...</p>
      ) : (
        <div className="mt-6 text-white text-center">
          <div className="flex justify-center items-center gap-4">
            {/* Previous Button */}
            <button
              onClick={handlePreviousPage}
              className={`${
                page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-bold py-2 px-4 rounded-lg`}
              disabled={page === 1}
            >
              &laquo; Previous
            </button>

            {/* Render Pagination Numbers */}
            {renderPageNumbers()}

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              className={`${
                page === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-bold py-2 px-4 rounded-lg`}
              disabled={page === totalPages}
            >
              Next &raquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
