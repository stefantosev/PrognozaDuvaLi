import "./Home.css";

interface HomeProps {
  weather: any;
  error: string | null;
}

export default function Home({ weather, error }: HomeProps) {
  // Format date to be more readable (e.g., "Mon, Oct 7")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
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

          {/* Forecast Section - Smaller Cards */}
          {weather.forecast && weather.forecast.forecastday && weather.forecast.forecastday.length > 1 && (
            <div className="forecast-section">
              <h3 className="forecast-title">
                {weather.forecast.forecastday.length - 1}-Day Forecast
              </h3>
              <div className="forecast-cards">
                {/* Skip the first day (today) since we already show it in the large card */}
                {weather.forecast.forecastday.slice(1).map((day: any, index: number) => (
                  <div key={index} className="forecast-card">
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
            </div>
          )}
        </>
      )}
    </div>
  );
}