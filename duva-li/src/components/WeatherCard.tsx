import React from "react";
import styles from "./WeatherCard.module.css";

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
}

interface WeatherCardProps {
  forecastDays: ForecastDay[];
}

const WeatherCard: React.FC<WeatherCardProps> = ({ forecastDays }) => {
  return (
    <div className={styles.forecastContainer}>
      {forecastDays.slice(1).map((day, index) => (
        <article className={styles.box} key={day.date}>
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
              weekday: "long",
            })}
          </h1>
          <span className={styles.temp}>{Math.round(day.day.avgtemp_c)}°</span>
          <span className={styles.highLow}>
            {Math.round(day.day.mintemp_c)}° / {Math.round(day.day.maxtemp_c)}°
          </span>
        </article>
      ))}
    </div>
  );
};

export default WeatherCard;
