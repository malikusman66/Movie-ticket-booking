import React from "react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";

const Favorite = () => {
  return (
    <div className="relative px-6 md:px-16 lg:px-36 mt-16">
      <BlurCircle />
      <h1 className="text-3xl font-bold mb-8 text-white">Favorite Shows</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dummyShowsData.map((show) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
