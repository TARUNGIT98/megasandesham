import React, { useState } from "react";
import WeatherInfo from "./components/WeatherInfo";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const popularCitiesData = [
    {
      id: 1,
      name: "New York",
      sys: { country: "US" },
      main: { temp: 22, feels_like: 20, humidity: 60 },
      weather: [{ main: "Clear", description: "Sunny" }],
      wind: { speed: 5 },
    },
    {
      id: 2,
      name: "London",
      sys: { country: "GB" },
      main: { temp: 15, feels_like: 13, humidity: 70 },
      weather: [{ main: "Clouds", description: "Cloudy" }],
      wind: { speed: 3 },
    },
    {
      id: 3,
      name: "Tokyo",
      sys: { country: "JP" },
      main: { temp: 28, feels_like: 30, humidity: 50 },
      weather: [{ main: "Rain", description: "Rainy" }],
      wind: { speed: 7 },
    },
    {
      id: 4,
      name: "Sydney",
      sys: { country: "AU" },
      main: { temp: 25, feels_like: 23, humidity: 55 },
      weather: [{ main: "Clear", description: "Clear" }],
      wind: { speed: 4 },
    },
  ];
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // Simulate API call
    setTimeout(() => {
      if (location.toLowerCase() === "invalid") {
        setError("Location not found. Please try again.");
      } else {
        setWeatherData({
          name: location,
          sys: { country: "IN" },
          main: {
            temp: Math.floor(Math.random() * 30),
            feels_like: 25,
            humidity: 60,
          },
          weather: [{ main: "Clear", description: "Sunny" }],
          wind: { speed: 5 },
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-center mb-8">
        <div className="flex items-center">
          <h1 className="text-5xl font-bold text-white">మేఘసందేశం</h1>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-8">
        <SearchBar
          location={location}
          onLocationChange={handleLocationChange}
          onSearch={handleSearch}
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-8">
          <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Error Message */}
          {error && <p className="text-red-400 mt-4">{error}</p>}

          {/* Searched City Weather */}
          {weatherData && (
            <div className="flex mb-8 w-full max-w-2xl justify-center">
              <WeatherInfo weatherData={weatherData} />
            </div>
          )}
        </>
      )}

      {/* Popular Cities Weather */}
      <div className="w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCitiesData.map((cityData) => (
            <div
              key={cityData.id}
              className="transition-transform duration-200 hover:scale-[1.02]"
            >
              <WeatherInfo weatherData={cityData} />
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
};

export default App;
