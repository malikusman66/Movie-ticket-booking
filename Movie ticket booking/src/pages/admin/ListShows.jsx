import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all shows (simulated API call)
  const fetchShows = async () => {
    try {
      setShows(dummyShowsData); // always use actual movie data
    } catch (error) {
      console.error("Failed to fetch shows:", error);
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  useEffect(() => {
    fetchShows();
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
              shows.map((show) => (
                <tr
                  key={show._id}
                  className="bg-[#1f1f1f] border-b border-[#3c0d0d] even:bg-[#2b2b2b]"
                >
                  {/* Use optional chaining to prevent errors */}
                  <td className="p-3 pl-5">
                    {show.movie?.title || "Unknown Movie"}
                  </td>
                  <td className="p-3">
                    {show.showDateTime
                      ? dateFormat(show.showDateTime)
                      : "Unknown Time"}
                  </td>
                  <td className="p-3">
                    {currency}{" "}
                    {show.showPrice != null
                      ? Number(show.showPrice).toFixed(2)
                      : "0.00"}
                  </td>
                  <td className="p-3">
                    {show.totalSeats != null ? show.totalSeats : "0"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">
                  No shows available.
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
