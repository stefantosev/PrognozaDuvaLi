import { useState } from "react";
import "./Home.css";

interface HomeProps {
  weather: any;
  error: string | null;
}

export default function Home({ weather, error }: HomeProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatHour = (hourString: string) => {
    const date = new Date(hourString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="home-container">
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {weather && (
        <>
          {/* Current Weather - Large Card */}
          <div className="current-weather-card">
            <div className="current-header">
              <div>
                <h2>{weather.location?.name}</h2>
                <p className="location">
                  {weather.location?.region}, {weather.location?.country}
                </p>
                <p className="update-time">Updated: {weather.current?.last_updated}</p>
              </div>
              <div className="current-temp-main">
                <img src={weather.current?.condition?.icon} alt="icon" className="current-icon" />
                <h1 className="current-temp">{weather.current?.temp_c}°C</h1>
              </div>
            </div>
            <p className="current-condition">{weather.current?.condition?.text}</p>
            <div className="current-details-grid">
              <div className="current-detail">
                <span className="detail-label">Feels Like</span>
                <span className="detail-value">{weather.current?.feelslike_c}°C</span>
              </div>
              <div className="current-detail">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weather.current?.humidity}%</span>
              </div>
              <div className="current-detail">
                <span className="detail-label">Wind Speed</span>
                <span className="detail-value">{weather.current?.wind_kph} km/h</span>
              </div>
            </div>
          </div>

          {}
          {weather.forecast && weather.forecast.forecastday && weather.forecast.forecastday.length > 1 && (
            <div className="forecast-section">
              <h3 className="forecast-title">
                {weather.forecast.forecastday.length - 1}-Day Forecast
              </h3>
              <div className="forecast-cards">
                {weather.forecast.forecastday.slice(1).map((day: any, index: number) => (
                  <div
                    key={index}
                    className="forecast-card"
                    style={{
                      cursor: "pointer",
                      border: expandedIndex === index ? "2px solid #fff" : "1px solid #f0f0f0",
                      boxShadow: expandedIndex === index
                        ? "0 0 0 3px rgba(102,126,234,0.3)"
                        : "0 4px 15px rgba(0, 0, 0, 0.3)",
                      transition: "box-shadow 0.2s, border 0.2s"
                    }}
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  >
                    <h4 className="forecast-day">{formatDate(day.date)}</h4>
                    <img 
                      src={day.day.condition.icon} 
                      alt={day.day.condition.text} 
                      className="forecast-icon"
                    />
                    <div className="forecast-temps">
                      <span className="max-temp">{Math.round(day.day.maxtemp_c)}°</span>
                      <span className="min-temp">{Math.round(day.day.mintemp_c)}°</span>
                    </div>
                    <p className="forecast-condition">{day.day.condition.text}</p>
                    <div className="forecast-details">
                      <div className="forecast-detail">
                        <span>💧</span>
                        <span>{day.day.avghumidity}%</span>
                      </div>
                      <div className="forecast-detail">
                        <span>💨</span>
                        <span>{day.day.maxwind_kph}km/h</span>
                      </div>
                      {day.day.totalprecip_mm > 0 && (
                        <div className="forecast-detail">
                          <span>🌧️</span>
                          <span>{day.day.totalprecip_mm}mm</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {}
              {expandedIndex !== null && (
                <div className="hourly-forecast-row">
                  <h5 style={{ margin: "0 0 1rem 0", textAlign: "center" }}>
                    Hourly Forecast (every 3 hours) for {formatDate(weather.forecast.forecastday[expandedIndex + 1].date)}
                  </h5>
                  <div className="hourly-forecast-list">
                    {weather.forecast.forecastday[expandedIndex + 1].hour
                      .filter((_: any, hIdx: number) => hIdx % 3 === 0)
                      .map((hour: any, hIdx: number) => (
                        <div className="hourly-forecast-item" key={hIdx}>
                          <div style={{ fontSize: "0.95rem", marginBottom: "0.3rem" }}>
                            {formatHour(hour.time)}
                          </div>
                          <img src={hour.condition.icon} alt={hour.condition.text} style={{ width: 36, height: 36 }} />
                          <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>{hour.temp_c}°C</div>
                          <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>{hour.condition.text}</div>
                          <div style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>
                            💧 {hour.humidity}%<br />
                            💨 {hour.wind_kph}km/h
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}