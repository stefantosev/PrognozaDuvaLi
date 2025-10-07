import { useState } from "react";
import DuvaLiLogo from "../assets/PrognozaDuvaLi.png";
import "./Navbar.css";

interface NavbarProps {
  onSearch: (city: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (!city) return;
    onSearch(city);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={DuvaLiLogo} alt="Weather Logo" />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button className="search-button">Dashboard</button>
        <button className="search-button">Heat Map</button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
    </div>
  );
}