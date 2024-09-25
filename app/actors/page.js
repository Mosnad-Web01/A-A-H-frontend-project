"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link'; 
import '../../.env';
import ActorCard from '../../components/ActorCard/ActorCard';

const API_BASEURL = 'https://api.themoviedb.org/3';

export default function Actors() {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const pagesToShow = 3;

  useEffect(() => {
    const fetchPopularActors = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASEURL}/person/popular?api_key=${PUBLIC_API_KEY}&language=en-US&page=${page}`
        );
        const data = await res.json();
        if (data.results) {
          setActors(data.results);
          setTotalPages(data.total_pages);
          setHasMore(data.page < data.total_pages);
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
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
  };

  const renderPageNumbers = () => {
    const pages = [];

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

    if (page > pagesToShow) {
      pages.push(
        <span key="ellipsis-start" className="text-white px-2">
          ...
        </span>
      );
    }

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

    if (page < totalPages - pagesToShow) {
      pages.push(
        <span key="ellipsis-end" className="text-white px-2">
          ...
        </span>
      );
    }

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
            <button
              onClick={handlePreviousPage}
              className={`${
                page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-bold py-2 px-4 rounded-lg`}
              disabled={page === 1}
            >
              &laquo; Previous
            </button>

            {renderPageNumbers()}

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
