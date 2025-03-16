import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ location, onLocationChange, onSearch }) => {
  return (
    <div className="flex justify-center mt-4">
      <form
        onSubmit={onSearch}
        className="flex items-center w-full max-w-md bg-white/90
                 rounded-full shadow-md p-2"
      >
        <input
          type="text"
          value={location}
          onChange={onLocationChange}
          placeholder="Search for a location"
          className="flex-grow bg-transparent px-4 py-2 text-gray-700
                   focus:outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white
                   rounded-full p-2 transition"
        >
          <FaSearch size={16} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
