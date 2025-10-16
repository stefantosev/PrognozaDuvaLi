import React, { useEffect, useState, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./WeatherMap.css";

interface CityWeather {
  city: string;
  lat: number;
  lon: number;
  temperature: number;
  condition: string;
  icon: string;
}

if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

const WeatherMap: React.FC = () => {
  const [cityWeather, setCityWeather] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchCountryWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://prognozaduvali.onrender.com/api/weather-map/country"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status}`);
      }

      const data: CityWeather[] = await response.json();
      setCityWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching country weather:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCountryWeather();
  }, [fetchCountryWeather]);

  const getTemperatureColor = useCallback((temp: number): string => {
    if (temp < 0) return "#6366f1"; 
    if (temp < 10) return "#3b82f6";
    if (temp < 20) return "#10b981"; 
    if (temp < 30) return "#f59e0b"; 
    return "#ef4444"; 
  }, []);

  const createCustomIcon = useCallback(
    (weather: CityWeather) => {
      const tempColor = getTemperatureColor(weather.temperature);
      const textColor = weather.temperature > 20 ? "#1f2937" : "#ffffff";
      const fontSize = isMobile ? "10px" : "11px";
      const padding = isMobile ? "4px 8px" : "6px 10px";
      const iconSize: [number, number] = isMobile ? [45, 30] : [50, 35];
      const iconAnchor: [number, number] = isMobile ? [22, 30] : [25, 35];

      return L.divIcon({
        className: "custom-weather-marker",
        html: `
        <div style="
          background: ${tempColor};
          color: ${textColor};
          padding: ${padding};
          border-radius: 16px;
          border: 2px solid white;
          font-weight: bold;
          font-size: ${fontSize};
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          text-align: center;
          min-width: ${isMobile ? "45px" : "50px"};
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
          cursor: pointer;
        ">
          <div>${Math.round(weather.temperature)}°C</div>
          <div style="font-size: ${
            isMobile ? "8px" : "9px"
          }; margin-top: 2px; opacity: 0.9;">
            ${
              weather.city.length > 8
                ? weather.city.substring(0, 8) + "..."
                : weather.city
            }
          </div>
        </div>
      `,
        iconSize,
        iconAnchor,
      });
    },
    [getTemperatureColor, isMobile]
  );

  const mapCenter = useMemo((): [number, number] => {
    if (cityWeather.length === 0) return [41.6086, 21.7453]; // Default to Macedonia

    const avgLat =
      cityWeather.reduce((sum, city) => sum + city.lat, 0) / cityWeather.length;
    const avgLon =
      cityWeather.reduce((sum, city) => sum + city.lon, 0) / cityWeather.length;

    return [avgLat, avgLon];
  }, [cityWeather]);

  const mapZoom = useMemo((): number => {
    if (cityWeather.length === 0) return 7;
    if (cityWeather.length === 1) return 10;
    return isMobile ? 6 : 7;
  }, [cityWeather.length, isMobile]);

  if (loading) {
    return (
      <div className="weather-map-container">
        <div className="weather-map-loading">
          <div className="loading-spinner"></div>
          <h2>Loading Weather Map</h2>
          <p>Fetching weather data for cities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-map-container">
        <div className="weather-map-error">
          <h2>Unable to Load Map</h2>
          <p>{error}</p>
          <button className="retry-button" onClick={fetchCountryWeather}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-map-page">
      <div className="weather-map-container">
        
          <div className="header-content">
            <h1>🌤️ Weather Map</h1>
            <div className="header-stats">
              <span className="city-count">{cityWeather.length} Cities</span>
              <span>•</span>
              <span className="update-time">Live Data</span>
            </div>
          </div> 

        <div className="map-wrapper">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            className="weather-map"
            zoomControl={!isMobile}
            dragging={!isMobile}
            // tap={!isMobile}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {cityWeather.map((city) => (
              <Marker
                key={`${city.city}-${city.lat}-${city.lon}`}
                position={[city.lat, city.lon]}
                icon={createCustomIcon(city)}
              >
                <Popup className="weather-popup">
                  <div className="popup-content">
                    <h3>{city.city}</h3>
                    <div className="weather-info">
                      <img
                        src={`https:${city.icon}`}
                        alt={city.condition}
                        className="weather-icon"
                      />
                      <div className="weather-details">
                        <div className="temperature">
                          {Math.round(city.temperature)}°C
                        </div>
                        <div className="condition">{city.condition}</div>
                      </div>
                    </div>
                    <div className="coordinates">
                      📍 {city.lat.toFixed(2)}, {city.lon.toFixed(2)}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="weather-legend">
          <div className="legend-title">Temperature Legend</div>
          <div className="legend-items">
            {[
              { color: "#ef4444", label: "Hot (30°C+)" },
              { color: "#f59e0b", label: "Warm (20-29°C)" },
              { color: "#10b981", label: "Mild (10-19°C)" },
              { color: "#3b82f6", label: "Cold (0-9°C)" },
              { color: "#6366f1", label: "Very Cold (<0°C)" },
            ].map((item, index) => (
              <div key={index} className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
