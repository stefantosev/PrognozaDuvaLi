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
      const res = await fetch(`http://localhost:8080/api/weather/${encodeURIComponent(city)}`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      setError(null);
    } 
    catch (err: any) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setWeather(null);
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Home weather={weather} error={error} />
    </>
  );
}

export default App;
