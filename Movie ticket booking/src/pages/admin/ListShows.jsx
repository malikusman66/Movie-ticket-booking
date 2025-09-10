import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllShows = async () => {
    try {
      // Simulate API call
      setShows(dummyShowsData || []);
    } catch (error) {
      console.error("Error fetching shows:", error);
    } finally {
      setIsLoading(false); // ✅ always stop loading
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <Title text1="List" text2="Shows" />

      <div className="max-w-6xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden whitespace-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-3 font-semibold pl-5">Movie Name</th>
              <th className="p-3 font-semibold">Show Time</th>
              <th className="p-3 font-semibold">Ticket Price</th>
              <th className="p-3 font-semibold">Total Seats</th>
            </tr>
          </thead>

          <tbody>
            {shows.length > 0 ? (
              shows.map((show, index) => (
                <tr
                  // ✅ use unique key: _id if available, else fallback
                  key={
                    show._id ||
                    `${show.movie.title}-${show.showDateTime}-${index}`
                  }
                  className="bg-[#1f1f1f] border-b border-[#3c0d0d] even:bg-[#2b2b2b]"
                >
                  <td className="p-3 pl-5">{show.movie?.title || "N/A"}</td>
                  <td className="p-3">
                    {show.showDateTime ? dateFormat(show.showDateTime) : "N/A"}
                  </td>
                  <td className="p-3">
                    {currency}{" "}
                    {show.showPrice
                      ? Number(show.showPrice).toFixed(2)
                      : "0.00"}
                  </td>
                  <td className="p-3">{show.totalSeats || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">
                  No shows found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListShows;
