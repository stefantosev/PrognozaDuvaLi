import { useState } from "react";

import Navbar from "../components/Navbar";
import "./Home.css";


export default function Home() {

  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    if (!city) return;
    try {
      const res = await fetch(`http://localhost:8080/api/weather/${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      setError(null);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setWeather(null);
    }
  };

    return (
      <div className="home-container">
        <Navbar onSearch={handleSearch} />

        {/* ⚠️ Error */}
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

        {/* 🌦️ Weather Info */}
        {weather && (
          <div className="weather-card">
            <h2>{weather.location?.name}</h2>
            <p>
              {weather.location?.region}, {weather.location?.country}
            </p>
            <p>Updated: {weather.current?.last_updated}</p>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <img src={weather.current?.condition?.icon} alt="icon" />
              <h1 style={{ fontSize: "3.5rem", margin: "0.5rem 0" }}>
                {weather.current?.temp_c}°C
              </h1>
              <p>{weather.current?.condition?.text}</p>
            </div>

            <div className="weather-details">
              <div className="weather-box">
                <p>Feels Like</p>
                <h3>{weather.current?.feelslike_c}°C</h3>
              </div>
              <div className="weather-box">
                <p>Humidity</p>
                <h3>{weather.current?.humidity}%</h3>
              </div>
              <div className="weather-box">
                <p>Wind Speed</p>
                <h3>{weather.current?.wind_kph} km/h</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}