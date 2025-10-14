
import { useState } from "react";
import "./ForecastSection.css";

interface ForecastSectionProps {
  forecastDays: any[];
}

export default function ForecastSection({ forecastDays }: ForecastSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  if (!forecastDays || forecastDays.length <= 1) return null;

  return (
    <div className="forecast-section">
      <h3 className="forecast-title">
        {forecastDays.length - 1}-Day Forecast
      </h3>

      <div className="forecast-cards">
        {forecastDays.slice(1).map((day, index) => (
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
    
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

