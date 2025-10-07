import "./Home.css";

interface HomeProps {
  weather: any;
  error: string | null;
}

export default function Home({ weather, error }: HomeProps) {
  return (
    <div className="home-container">
  
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.location?.name}</h2>
          <p>
            {weather.location?.region}, {weather.location?.country}
          </p>
          <p>Updated: {weather.current?.last_updated}</p>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <img src={weather.current?.condition?.icon} alt="icon" />
            <h1 style={{ fontSize: "3.5rem", margin: "0.5rem 0" }}>
              {weather.current?.temp_c}°C
            </h1>
            <p>{weather.current?.condition?.text}</p>
          </div>

          <div className="weather-details">
            <div className="weather-box">
              <p>Feels Like</p>
              <h3>{weather.current?.feelslike_c}°C</h3>
            </div>
            <div className="weather-box">
              <p>Humidity</p>
              <h3>{weather.current?.humidity}%</h3>
            </div>
            <div className="weather-box">
              <p>Wind Speed</p>
              <h3>{weather.current?.wind_kph} km/h</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}