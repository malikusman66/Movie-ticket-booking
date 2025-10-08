import React, { useState } from "react";
import { dummyShowsData } from "../../assets/assets.js";

const AddShows = ({ shows, setShows, movies = dummyShowsData }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [price, setPrice] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleAddShow = () => {
    if (!selectedMovie || !price || !dateTime) return;

    const newShow = {
      _id: Date.now().toString(),
      movie: selectedMovie,
      showPrice: parseFloat(price),
      showDateTime: dateTime,
      poster: selectedMovie.poster,
      rating: selectedMovie.rating,
    };

    setShows([newShow, ...(shows || [])]);
    setSelectedMovie(null);
    setPrice("");
    setDateTime("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add New Show</h2>

      {/* Movie Selection */}
      <div className="flex space-x-4 overflow-x-auto mb-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className={`min-w-[120px] cursor-pointer rounded-lg overflow-hidden border-2 ${
              selectedMovie?.id === movie.id
                ? "border-pink-500"
                : "border-transparent"
            }`}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <p className="text-sm mt-1 text-center">{movie.title}</p>
          </div>
        ))}
      </div>

      {/* Show Inputs */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
        <input
          type="number"
          placeholder="Enter show price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 rounded-md bg-[#1f1f1f] border border-gray-700 text-white"
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="p-2 rounded-md bg-[#1f1f1f] border border-gray-700 text-white"
        />
        <button
          onClick={handleAddShow}
          className="bg-pink-600 px-4 py-2 rounded-md hover:bg-pink-500"
        >
          Add Show
        </button>
      </div>
    </div>
  );
};

export default AddShows;
