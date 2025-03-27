import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ location, onLocationChange, onSearch }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // 1) Fetch city suggestions using OpenWeather Geocoding API
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setIsFetching(true);
    try {
      const res = await axios.get(
        "https://api.openweathermap.org/geo/1.0/direct",
        {
          params: {
            q: query,
            limit: 5,
            appid: "c4f5ca516053c7b16b3ec2ff46bfdba6", // Your OpenWeather API key
          },
        }
      );
      setSuggestions(res.data || []);
    } catch (err) {
      console.error("Auto-suggest error:", err);
    } finally {
      setIsFetching(false);
    }
  };

  // 2) Handle input changes, update parent state, fetch suggestions
  const handleInputChange = (e) => {
    onLocationChange(e); // Update parent component's location state
    fetchSuggestions(e.target.value);
  };

  // 3) When user clicks a suggestion, populate the input and clear suggestions
  const handleSuggestionClick = (city) => {
    // city object includes { name, state, country, lat, lon }
    onLocationChange({ target: { value: city.name } });
    setSuggestions([]);
  };

  return (
    <div className="relative flex justify-center mt-4">
      <form
        onSubmit={onSearch}
        className="flex items-center w-full max-w-md bg-white/90
                   rounded-full shadow-md p-2"
      >
        <input
          type="text"
          value={location}
          onChange={handleInputChange}
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

      {/* 4) Loading state */}
      {isFetching && (
        <p className="absolute top-full mt-1 text-gray-200">Loading...</p>
      )}

      {/* 5) Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul
          className="absolute top-full mt-1 bg-white text-gray-800 
                       rounded-md shadow-md w-full max-w-md z-10"
        >
          {suggestions.map((city, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(city)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
