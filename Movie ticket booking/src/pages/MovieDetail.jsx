import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  dummyDateTimeData,
  dummyShowsData,
  dummyTrailers,
} from "../assets/assets";
import BlueCircle from "../components/BlurCircle";
import { Heart, PlayCircleIcon, StarIcon } from "lucide-react";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";

const MovieDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const getShow = async () => {
      const foundShow = dummyShowsData.find((s) => s.id === Number(id));
      if (foundShow) {
        setShow({
          movie: foundShow,
          dateTime: dummyDateTimeData,
        });
      } else {
        setShow(null);
      }
    };
    getShow();
  }, [id]);

  useEffect(() => {
    if (showTrailer && videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay was prevented:", error);
        });
      }
    }
  }, [showTrailer, currentTrailer]);

  if (!show) return <div>Loading...</div>;

  return (
    <div className="px-6 md:px-16 lg:px-40 pt-10 md:pt-20">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        <img
          src={show.movie.poster_path}
          alt=""
          className="max-md:mx-auto rounded-xl h-104 max-w-70 object-cover"
        />
        <div className="relative flex flex-col gap-4">
          <BlueCircle top="-100px" left="-100px" />
          <p className="text-primary">ENGLISH</p>
          <h1 className="text-4xl font-semibold max-w-96 text-balance">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="w-5 h-5 text-primary fill-primary" />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
            {show.movie.overview}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-6">
            <button
              onClick={() => {
                setCurrentTrailer(dummyTrailers[0]);
                setShowTrailer(true);
              }}
              className="flex items-center gap-2 px-7 py-3 bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              <PlayCircleIcon className="w-5 h-5" />
              Watch Trailer
            </button>

            {showTrailer && currentTrailer && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                <div className="max-w-[960px] w-full aspect-video relative">
                  <button
                    onClick={() => setShowTrailer(false)}
                    className="absolute top-2 right-2 bg-black p-2 z-20"
                  >
                    ✕
                  </button>
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/CMyrp5Vk3mU?si=MurmZ6U-r2saNfB-"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            )}

            <a
              href="#dateSelect"
              className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95"
            >
              Buy Tickets
            </a>
            <button className="flex items-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-10">
            <p className="text-lg font-medium mb-4">More Trailers</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {dummyTrailers.map((trailer, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer overflow-hidden rounded-lg group transition-transform hover:-translate-y-1 ${
                    currentTrailer &&
                    currentTrailer.videoUrl === trailer.videoUrl
                      ? "outline outline-2 outline-primary"
                      : ""
                  }`}
                  onClick={() => {
                    setCurrentTrailer(trailer);
                    setShowTrailer(true);
                  }}
                >
                  <img
                    src={trailer.image}
                    alt="trailer thumbnail"
                    className="w-full h-32 md:h-40 object-cover rounded-lg brightness-75 group-hover:brightness-50 duration-300"
                  />
                  <PlayCircleIcon
                    strokeWidth={1.6}
                    className="absolute top-1/2 left-1/2 w-8 h-8 md:w-10 md:h-10 transform -translate-x-1/2 -translate-y-1/2 opacity-90 text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-lg font-medium mt-20">Your Favorite Cast</p>
      <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
        <div className="flex items-center gap-6 w-max px-4">
          {show.movie.casts.slice(0, 12).map((casts, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={casts.profile_path}
                alt=""
                className="rounded-full h-20 md:h-20 aspect-square object-cover"
              />
              <p className="font-medium text-xs mt-3">{casts.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />
    </div>
  );
};

export default MovieDetail;
