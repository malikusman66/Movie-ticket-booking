import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      // Simulate API call
      setBookings(dummyBookingData || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false); // ✅ always stop loading
    }
  };

  useEffect(() => {
    console.log("Dummy booking data:", dummyBookingData);
    getAllBookings();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <Title text1="List" text2="Bookings" />

      <div className="max-w-6xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden whitespace-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-3 font-semibold pl-5">User Name</th>
              <th className="p-3 font-semibold">Movie Name</th>
              <th className="p-3 font-semibold">Show Time</th>
              <th className="p-3 font-semibold">Seats</th>
              <th className="p-3 font-semibold">Amount</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((item) => (
                <tr
                  key={
                    item._id || `${item.user?.name}-${item.show?.showDateTime}`
                  }
                  className="bg-[#1f1f1f] border-b border-[#3c0d0d] even:bg-[#2b2b2b]"
                >
                  <td className="p-3 pl-5">{item.user?.name || "N/A"}</td>
                  <td className="p-3">{item.show?.movie?.title || "N/A"}</td>
                  <td className="p-3">
                    {item.show?.showDateTime
                      ? dateFormat(item.show.showDateTime)
                      : "N/A"}
                  </td>
                  <td className="p-3">
                    {item.bookedSeats
                      ? Object.values(item.bookedSeats).join(", ")
                      : "N/A"}
                  </td>
                  <td className="p-3">
                    {currency}{" "}
                    {item.amount ? Number(item.amount).toFixed(2) : "0.00"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-400">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBookings;
