import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import HeatMap from "./pages/HeatMap";
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
        
        // ✅ Must Re-throw: This is what triggers the 'catch' in the retry loop.
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
      // 1. Get user location (This is the part that might fail initially)
      position = await getCurrentPositionAsync();
    } catch (err) {
      // 2. Geolocation failed (User denied/not supported). Stop loading immediately.
      console.error(err);
      setError(
        "Unable to retrieve your location. Please enter a city manually."
      );
      // ✅ FIX: Stop loading here on Geolocation failure
      setIsLoading(false); 
      return; // Exit the function since we can't get coordinates
    }

    // Geolocation succeeded. Now, start the persistent retry loop.
    const { latitude, longitude } = position.coords;
    let success = false;
    
    // 3. Persistent Retry Loop: This loop runs FOREVER until success
    while (!success) {
        try {
            await handleGetLocation(latitude, longitude);
            success = true; // Backend call succeeded
        } catch (err) {
            // Backend failed or is unreachable, but Geolocation succeeded.
            console.warn("Backend not ready, retrying in 5s...", err);
            // Wait longer, e.g., 5 seconds, for a persistent loader feel
            await new Promise((r) => setTimeout(r, 5000)); 
            // Loop continues...
        }
    }
    
    // ✅ FIX: Stop loading ONLY on SUCCESS
    setIsLoading(false);
}

useEffect(() => {
    loadWeatherForLocation();
  }, []);

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
        <Route path="/heatmap" element={<HeatMap />} />
      </Route>
    </Routes>
  );
}

export default App;
