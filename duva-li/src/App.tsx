import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import WeatherMap from "./pages/WeatherMap";

function Layout({
  weather,
  error,
  onSearch,
  onGetLocation,
}: {
  weather: any;
  error: string | null;
  onSearch: (city: string) => void;
  onGetLocation: (lat: number, lon: number) => void;
}) {
  return (
    <>
      <Navbar onSearch={onSearch} onGetLocation={onGetLocation} />
      <Outlet context={{ weather, error }} />
    </>
  );
}

function App() {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    if (!city) return;
    try {
      const res = await fetch(
        `http://localhost:8080/api/weather/${encodeURIComponent(
          city
        )}/forecast?days=7`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      setError(null);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setWeather(null);
    }
  };

  const handleGetLocation = async (lat: number, lon: number) => {
    const res = await fetch(
      `http://localhost:8080/api/weather/${encodeURIComponent(
        lat + "," + lon
      )}/forecast?days=7`
    );
    const data = await res.json();
    console.log(data);
    setWeather(data);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);
          handleGetLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(
            "Unable to retrieve your location. Please allow location access or enter a city manually."
          );
          handleSearch("Skopje");
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      handleSearch("Skopje");
    }
  }, []);

return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            weather={weather}
            error={error}
            onSearch={handleSearch}
            onGetLocation={handleGetLocation}
          />
        }
      >
        <Route index element={<Home />} />
        <Route path="weather-map" element={<WeatherMap />} />
        
      </Route>
    </Routes>
  );
}

export default App;