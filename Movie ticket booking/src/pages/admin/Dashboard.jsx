import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import BlueCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateFormat";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });
  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: currency + dashboardData.totalRevenue || "0",
      icon: CircleDollarSignIcon,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || "0",
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />

      <div className="relative flex flex-wrap gap-4 mt-6">
        <BlueCircle top="-100px" left="0" />
        <div className="flex flex-wrap gap-4 w-full">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md max-w-50 w-full"
            >
              <div>
                <h1 className="text-sm">{card.title}</h1>
                <p className="text-xl font-medium mt-1">{card.value}</p>
              </div>
              <card.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-xl font-semibold text-white">Active Shows</p>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 w-full max-w-7xl">
        <BlueCircle top="100px" left="-10px" />

        {dashboardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="rounded-xl overflow-hidden bg-[#1e1e2f] border border-[#2f2f3f] shadow-md hover:-translate-y-1 transition duration-300"
          >
            <img
              src={show.movie.poster_path}
              alt={show.movie.title}
              className="h-60 w-full object-cover"
            />
            <div className="p-3">
              <p className="font-semibold text-white truncate">
                {show.movie.title}
              </p>

              <div className="flex items-center justify-between mt-2 text-sm">
                <p className="text-white font-medium">
                  {currency}
                  {show.showPrice}
                </p>
                <p className="flex items-center gap-1 text-gray-400">
                  <StarIcon className="w-4 h-4 text-pink-500 fill-pink-500" />
                  {show.movie.vote_average.toFixed(1)}
                </p>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {dateFormat(show.showDateTime)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
