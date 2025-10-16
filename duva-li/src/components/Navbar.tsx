import { useState } from "react";
import DuvaLiLogo from "../assets/duvali-removebg.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

interface NavbarProps {
  onSearch: (city: string) => void;
  onGetLocation: (lat: number, lon: number) => void; // Optional prop for location fetching
}

export default function Navbar({ onSearch, onGetLocation }: NavbarProps) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (!city) return;
    onSearch(city);
  };

  

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);
          onGetLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please allow location access or enter a city manually.");
        }
      );
    }else{
      alert("Geolocation is not supported by this browser.");
    }
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
          onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
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

      <div className="location-container">
        <button className="location-button" 
          onClick={handleGetLocation}> 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="location-icon"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </button>
      </div>

      <div className="nav-links">
         <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/weather-map">Weather Map</Link>
          </div>
      </div>

    </div>
  );
}