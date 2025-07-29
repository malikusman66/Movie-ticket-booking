import React, { useState, useEffect, useRef } from "react";
import BlurCircle from "./BlurCircle";
import { dummyTrailers } from "../assets/assets";
import { PlayCircleIcon } from "lucide-react";

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Force reload
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay was prevented:", error);
        });
      }
    }
  }, [currentTrailer]);

  return (
    <div className="px-6 md:px-16 lg:px-24 py-2 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers
      </p>
      <div className="relative mt-6 max-w-[960px] mx-auto aspect-video">
        <BlurCircle className="absolute" top="-100px" right="-100px" />
        <video
          ref={videoRef}
          src={currentTrailer.videoUrl}
          controls
          muted
          autoPlay
          className="w-full h-full rounded-lg"
        />
      </div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            className={`relative cursor-pointer overflow-hidden rounded-lg group transition-transform hover:-translate-y-1 ${
              currentTrailer.videoUrl === trailer.videoUrl
                ? "outline outline-2 outline-primary"
                : ""
            }`}
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt="trailer"
              className="w-full h-32 md:h-40 object-cover rounded-lg brightness-75 group-hover:brightness-50 duration-300"
            />
            <PlayCircleIcon
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-8 h-8 md:w-10 md:h-10 transform -translate-x-1/2 -translate-y-1/2 opacity-90"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailersSection;
