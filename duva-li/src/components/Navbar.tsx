import { useState } from "react";
import DuvaLiLogo from "../assets/DuvaLiLogo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

interface NavbarProps {
  onSearch: (city: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [city, setCity] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearch = () => {
    if (!city) return;
    onSearch(city);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={DuvaLiLogo} alt="Weather Logo" />
      </div>
      <div className="nav-links">
         <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/heatmap" className="nav-link">Heat Map</Link>
          </div>
      </div>
      <div className={`search-container ${isSearchExpanded ? "expanded" : ""}`}>
        <button
          className="search-icon-button"
          onClick={toggleSearch}
          aria-label="Toggle search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button-submit">
          Search
        </button>
      </div>
    </div>
  );
}