import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

 const handleSearch = async (city: string) => {
  if (!city) return;
  try {
    const res = await fetch(
      `http://localhost:8080/api/weather/${encodeURIComponent(city)}/forecast?days=5`
    );
    if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      console.log("Full API Response:", data); 
      console.log("Forecast data:", data.forecast); 
      console.log("Forecast days:", data.forecast?.forecastday); 
      setWeather(data);
      setError(null);
  } 
  catch (err: any) {
    setError(err instanceof Error ? err.message : "An error occurred");
    setWeather(null);
  }
};

 const handleGetLocation = async (lat: number, lon: number) => {
     const res = await fetch(
      `http://localhost:8080/api/weather/${encodeURIComponent(lat + "," + lon)}/forecast?days=5`
    );
    const data = await res.json();
    console.log(data);
    setWeather(data);
}


  return (
    <>
      <Navbar
         onSearch={handleSearch} 
         onGetLocation={handleGetLocation}
      />
      <Home weather={weather} error={error} />
    </>
  );
}

export default App;