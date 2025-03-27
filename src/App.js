// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";

// List of popular city names
const POPULAR_CITY_NAMES = ["New York", "London", "Tokyo", "Sydney"];

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [popularCitiesData, setPopularCitiesData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1) Fetch real weather for each popular city on mount
  useEffect(() => {
    const fetchPopularCities = async () => {
      try {
        // Example: fetch each city from OpenWeather
        const responses = await Promise.all(
          POPULAR_CITY_NAMES.map((city) =>
            axios.get("https://api.openweathermap.org/data/2.5/weather", {
              params: {
                q: city,
                units: "metric",
                appid: "c4f5ca516053c7b16b3ec2ff46bfdba6",
              },
            })
          )
        );
        // Store results in state
        setPopularCitiesData(responses.map((res) => res.data));
      } catch (err) {
        console.error("Error fetching popular cities:", err);
      }
    };
    fetchPopularCities();
  }, []);

  // 2) Handle input changes for search
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // 3) Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location.trim()) return;

    setError("");
    setWeatherData(null);
    setIsLoading(true);

    try {
      // Real call to OpenWeather
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: location,
            units: "metric",
            appid: "c4f5ca516053c7b16b3ec2ff46bfdba6",
          },
        }
      );
      setWeatherData(response.data);
    } catch (err) {
      console.error(err);
      setError("Location not found. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Title / Navbar */}
      <nav className="w-full flex items-center justify-center mb-8">
        <h1 className="text-5xl font-bold text-white">మేఘసందేశం</h1>
      </nav>

      {/* Search Bar + Auto-Suggest (See next section) */}
      <div className="w-full max-w-2xl mb-8">
        <SearchBar
          location={location}
          onLocationChange={handleLocationChange}
          onSearch={handleSearch}
        />
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-400 mt-4">{error}</p>}

      {/* Searched City Weather */}
      {weatherData && !isLoading && (
        <div className="flex mb-8 w-full max-w-2xl justify-center">
          <WeatherInfo weatherData={weatherData} />
        </div>
      )}

      {/* Popular Cities */}
      <div className="w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCitiesData.map((city) => (
            <div
              key={city.id}
              className="transition-transform duration-200 hover:scale-[1.02]"
            >
              <WeatherInfo weatherData={city} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-gray-400 text-sm">
        <p>
          Powered by{" "}
          <a
            href="https://openweathermap.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 transition-colors duration-300"
          >
            OpenWeatherMap
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
