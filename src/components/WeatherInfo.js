import React from "react";
import {
  FaSun,
  FaCloudRain,
  FaCloud,
  FaSnowflake,
  FaCloudSun,
  FaSmog,
} from "react-icons/fa";

// Helper function to convert Celsius to Fahrenheit
const convertToF = (tempC) => Math.round((tempC * 9) / 5 + 32);

const WeatherInfo = ({ weatherData, unit = "C" }) => {
  if (!weatherData) return null;

  const { name, sys, main, weather } = weatherData;
  const condition = weather?.[0]?.main?.toLowerCase() || "";

  // Convert temperature based on unit prop
  const temperature =
    unit === "F" ? convertToF(Math.round(main.temp)) : Math.round(main.temp);
  const feelsLike =
    unit === "F"
      ? convertToF(Math.round(main.feels_like))
      : Math.round(main.feels_like);
  const humidity = main.humidity;
  const windSpeed = weatherData.wind?.speed || 0;

  // Choose icon and background image based on weather condition
  let IconComponent = FaCloud;
  let backgroundImage =
    "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&w=600"; // Default

  if (condition.includes("clear")) {
    IconComponent = FaSun;
    backgroundImage =
      "https://images.unsplash.com/photo-1496450681664-3df85efbd29f?auto=format&fit=crop&w=600"; // Sunny
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    IconComponent = FaCloudRain;
    backgroundImage =
      "https://images.unsplash.com/photo-1438449805896-28a666819a20?auto=format&fit=crop&w=600"; // Rainy
  } else if (condition.includes("snow")) {
    IconComponent = FaSnowflake;
    backgroundImage =
      "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=600"; // Snowy
  } else if (condition.includes("cloud")) {
    IconComponent = FaCloudSun;
    backgroundImage =
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600"; // Cloudy
  } else if (condition.includes("thunder")) {
    IconComponent = FaCloudRain;
    backgroundImage =
      "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?auto=format&fit=crop&w=600"; // Stormy
  } else if (
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze")
  ) {
    IconComponent = FaSmog;
    backgroundImage =
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=600"; // Misty/Foggy
  }

  return (
    <div
      className={`relative w-full max-w-xs overflow-hidden rounded-2xl p-6 shadow-lg backdrop-blur-sm bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="weather background"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* City and Temperature */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-medium text-white/90">
              {name}, {sys.country}
            </h2>
            <p className="text-4xl font-bold text-white mt-1">
              {temperature}°{unit}
            </p>
          </div>
          <IconComponent className="text-white/80" size={32} />
        </div>

        {/* Weather Details */}
        <div className="space-y-3 text-white/80">
          <div className="flex justify-between items-center">
            <span>Feels Like</span>
            <span className="font-medium">
              {feelsLike}°{unit}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Humidity</span>
            <span className="font-medium">{humidity}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Wind Speed</span>
            <span className="font-medium">{windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
