import React, { useState } from "react";
import styles from "./WeatherCard.module.css";
import HourlyForecast from "./HourlyForecast";

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  hour?: any[];
}

interface WeatherCardProps {
  forecastDays: ForecastDay[];
}

const WeatherCard: React.FC<WeatherCardProps> = ({ forecastDays }) => {
  const [selectedDay, setSelectedDay] = useState<ForecastDay | null>(null);

  const formatHour = (hourString: string) => {
    const date = new Date(hourString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  const handleDayClick = (day: ForecastDay) => {
    if (selectedDay?.date === day.date) {
      setSelectedDay(null);
    } else {
      setSelectedDay(day);
    }
  };

  const futureDays = forecastDays.slice(1);

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.forecastContainer}>
        {futureDays.map((day) => (
          <article 
            className={`${styles.box} ${selectedDay?.date === day.date ? styles.selected : ''}`}
            key={day.date}
            onClick={() => handleDayClick(day)}
          >
            <div className={styles.bubble}>
              <div className={styles.spin}>
                <img
                  src={
                    day.day.condition.icon.startsWith("//")
                      ? `https:${day.day.condition.icon}`
                      : day.day.condition.icon
                  }
                  alt={day.day.condition.text}
                />
              </div>
            </div>

            <h1>
              {new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </h1>
            <span className={styles.temp}>{Math.round(day.day.avgtemp_c)}°</span>
            <span className={styles.highLow}>
              {Math.round(day.day.mintemp_c)}° / {Math.round(day.day.maxtemp_c)}°
            </span>
          </article>
        ))}
      </div>

      {/* Hourly Forecast - appears below all cards */}
      {selectedDay && (
        <HourlyForecast 
          forecastDay={selectedDay}
          formatHour={formatHour}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

export default WeatherCard;