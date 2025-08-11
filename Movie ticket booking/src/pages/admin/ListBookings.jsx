import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    // Simulate API call
    setBookings(dummyBookingData);
    setIsLoading(false); // ✅ stop loading after data is set
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return !isLoading ? (
    <>
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
            {bookings.map((item) => (
              <tr
                key={item._id || `${item.user.name}-${item.show.showDateTime}`}
                className="bg-[#1f1f1f] border-b border-[#3c0d0d] even:bg-[#2b2b2b]"
              >
                <td className="p-3 pl-5">{item.user.name}</td>
                <td className="p-3">{item.show.movie.title}</td>
                <td className="p-3">{dateFormat(item.show.showDateTime)}</td>
                <td className="p-3">
                  {Object.values(item.bookedSeats).join(", ")}
                </td>
                <td className="p-3">
                  {currency} {item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListBookings;
