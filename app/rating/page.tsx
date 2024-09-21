import React, { useState } from "react";

const Rating = ({ movie,rating,setRating,mood,setMood,onClose }) => {
  
  const moods = ["😃", "😊", "😄", "😂", "😍"];

  if (!movie) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <p className="text-gray-600">No movie selected.</p>
          <button onClick={onClose} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 mt-4">
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
     localStorage.setItem(`userRating_${movie.id}`, JSON.stringify(rating));
    //more.. 
    onClose();

  };
  
  const posterUrl = movie.poster_path
  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  : "/default-poster.jpg";

  return (
 
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Rating</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">✕</button>
        </div>
        <p className="text-gray-600 mb-4">What did you think of {movie.title}?</p>

        {/* Range slider for rating */}
        <div className="mb-6">
          <input type="range" min="0" max="100" value={rating} 
          onChange={(e) => setRating(parseInt(e.target.value, 10))} className="w-full" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>0</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span><span>70</span><span>80</span><span>90</span><span>100</span>
          </div>
        </div>

        <p className="text-lg font-semibold mb-2">{rating}% user score</p>

        {/* Emoji mood selection */}
        <p className="text-gray-600 mb-4">How did {movie.title} make you feel?</p>
        <div className="flex justify-between mb-6">
          {moods.map((emoji, index) => (
            <button key={index} onClick={() => setMood(emoji)} className={`text-3xl ${mood === emoji ? 'opacity-100' : 'opacity-50'}`}>{emoji}</button>
          ))}
        </div>

        <button onClick={handleSubmit} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">I'm Done</button>
      </div>
    </div>
  );
};

export default Rating;
