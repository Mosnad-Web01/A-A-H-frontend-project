'use client';

import { useEffect, useState } from "react";
import Rating from "../app/rating/page"; // Adjust path if needed
import MovieDetails from "../app/movie/[id]/movieDetails";
import ListPopup from "../app/listMovies/page"; // Import ListPopup

const MovieContainer = () => {
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [showListPopup, setShowListPopup] = useState(false); // For showing the list pop-up
  const [userLists, setUserLists] = useState([]); // List of user's lists

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMovie = localStorage.getItem("selectedMovie");
      const storedScore = localStorage.getItem("userRating");
      const storedLists = JSON.parse(localStorage.getItem("userLists")) || []; // Retrieve user's lists
      setUserLists(storedLists);

      if (storedMovie) {
        setMovie(JSON.parse(storedMovie));
      }
      if (storedScore) {
        setRating(JSON.parse(storedScore));
      }
    }
  }, []);

  // Handler to show the rating modal
  const handleVibeClick = () => {
    setShowRating(true);
  };

  // Handler to close the rating modal
  const handleCloseRating = () => {
    setShowRating(false);
  };

  // Handler to show the list pop-up
  const handleAddToListClick = () => {
    setShowListPopup(true);
  };

  // Handler to close the list pop-up
  const handleCloseListPopup = () => {
    setShowListPopup(false);
  };

  // Handler for creating a new list
  const handleCreateNewList = () => {
    // Add logic to create a new list
    const newListName = prompt("Enter new list name:");
    if (newListName) {
      const newList = { name: newListName, movies: [] };
      const updatedLists = [...userLists, newList];
      setUserLists(updatedLists);
      localStorage.setItem("userLists", JSON.stringify(updatedLists));
    }
  };

  return (
    <div>
      {/* Pass the movie and event handler to MovieDetails */}
      <MovieDetails
        movie={movie}
        rating={rating}
        onVibeClick={handleVibeClick} // Trigger when button clicked
        onAddToList={handleAddToListClick} // Trigger list pop-up
      />

      {/* Show the Rating component when showRating is true */}
      {showRating && (
        <Rating
          movie={movie}
          rating={rating}
          setRating={setRating}
          onClose={handleCloseRating}
        />
      )}

      {/* Show the ListPopup when showListPopup is true */}
      {showListPopup && (
        <ListPopup
          userLists={userLists}
          onCreateNewList={handleCreateNewList}
          onClose={handleCloseListPopup}
        />
      )}
    </div>
  );
};

export default MovieContainer;
