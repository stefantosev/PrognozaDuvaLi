import { useState } from "react";
import DuvaLiLogo from "../assets/duvali-removebg.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'; 

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

     <div className="search-container"> 
        <input 
          type="text" 
          placeholder="search anything" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="search-input" 
        /> 
        <button onClick={handleSearch} className="search-button-submit"> 
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
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
      </div> 

      <div className="nav-links">
         <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/heatmap" className="nav-link">Heat Map</Link>
          </div>
      </div>

    </div>
  );
}