import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import WeatherMap from "./pages/WeatherMap";
import LoadingSpinner from "./components/LoadingSpinner";

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
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  
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
     try {
      const res = await fetch(
        `http://localhost:8080/api/weather/${encodeURIComponent(
          lat + "," + lon
        )}/forecast?days=7`
      );

      if(!res.ok){
        throw new Error(`Server returned status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setWeather(data);
      setError(null);

    } catch (err: any) {
        const message = err.message || "An unknown network error occurred.";
        console.error("Fetch attempt failed:", message);
        setError(`Failed to connect to backend: ${message}`);
        
        throw err;
    }
  };
  

   const getCurrentPositionAsync = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) reject(new Error("Geolocation not supported"));
      else navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const loadWeatherForLocation = async () => {
    let position;
    try {
      position = await getCurrentPositionAsync();
    } catch (err) {
      console.error(err);
      setError(
        "Unable to retrieve your location. Please enter a city manually."
      );
      setIsLoading(false); 
      return; 
    }

    const { latitude, longitude } = position.coords;
    let success = false;
    

    while (!success) {
        try {
            await handleGetLocation(latitude, longitude);
            success = true;
        } catch (err) {  
            console.warn("Backend not ready, retrying in 5s...", err);
            await new Promise((r) => setTimeout(r, 5000)); 
          
        }
    }

    setIsLoading(false);
}

useEffect(() => {
    loadWeatherForLocation();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

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