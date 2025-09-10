import React, { useState } from "react";
import Title from "../../components/admin/Title";

const AddShows = () => {
  const [formData, setFormData] = useState({
    movieTitle: "",
    poster: "",
    showDateTime: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Show Added:", formData);

    // Reset form after submit
    setFormData({
      movieTitle: "",
      poster: "",
      showDateTime: "",
      price: "",
    });
  };

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <Title text1="Add" text2="Show" />

      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-lg bg-[#1f1f1f] p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Movie Title */}
        <div>
          <label className="block mb-1 text-sm font-medium">Movie Title</label>
          <input
            type="text"
            name="movieTitle"
            value={formData.movieTitle}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-[#2b2b2b] border border-gray-600 text-white"
          />
        </div>

        {/* Poster URL */}
        <div>
          <label className="block mb-1 text-sm font-medium">Poster URL</label>
          <input
            type="text"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-[#2b2b2b] border border-gray-600 text-white"
          />
        </div>

        {/* Show Date & Time */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Show Date & Time
          </label>
          <input
            type="datetime-local"
            name="showDateTime"
            value={formData.showDateTime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-[#2b2b2b] border border-gray-600 text-white"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-[#2b2b2b] border border-gray-600 text-white"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white font-semibold"
        >
          Add Show
        </button>
      </form>
    </div>
  );
};

export default AddShows;
