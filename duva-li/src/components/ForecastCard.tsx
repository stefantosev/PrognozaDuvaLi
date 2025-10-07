import "./ForecastCard.css";
import React from "react";

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
    };
    uv: number;
  };
}

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  return (
    <div className="forecast-container">
      {forecast.map((day, index) => (
        <div key={index} className="forecast-card">
          <h3>{new Date(day.date).toLocaleDateString()}</h3>
          <img
            src={day.day.condition.icon.startsWith("//") ? `https:${day.day.condition.icon}` : day.day.condition.icon}
            alt={day.day.condition.text}
          />
          <p className="condition-text">{day.day.condition.text}</p>

          <div className="temp-range">
            <p>🌡️ Max: {day.day.maxtemp_c}°C</p>
            <p>❄️ Min: {day.day.mintemp_c}°C</p>
          </div>

          <div className="extra-info">
            <p>💨 Wind: {day.day.maxwind_kph} km/h</p>
            <p>💧 Rain: {day.day.totalprecip_mm} mm</p>
            <p>☀️ UV: {day.day.uv}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;