import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Home.css";
import WeatherWidget from "../components/WeatherWidget";
import WeatherCard from "../components/WeatherCard";

interface HomeContextType {
  weather: any;
  error: string | null;
}

export default function Home() {
  const { weather } = useOutletContext<HomeContextType>();

  useEffect(() => {
    if (!weather?.current) return;

    const isDay = weather.current.is_day === 1;
    const imageUrl = isDay
      ? "https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif"
      : "https://i.makeagif.com/media/6-17-2017/BKjpdj.gif";

    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, [weather]);

  return (
    weather &&
    weather.forecast && (
      <div className="home-container">
        <div className="weather-widget-container">
          <WeatherWidget
            temp={weather.current.temp_c}
            wind={weather.current.wind_kph}
            humidity={weather.current.humidity}
            forecast={weather.forecast.forecastday
              .slice(1, 3)
              .map((day: any) => ({
                day: new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                }),
                max: Math.round(day.day.maxtemp_c),
                min: Math.round(day.day.mintemp_c),
              }))}
            condition={weather.current.condition.text}
            isDay={weather.current.is_day}
            name={weather.location.name}
            region={weather.location.region}
            country={weather.location.country}
            icon={weather.current.condition.icon}
            lastUpdated={weather.current.last_updated}
          />
        </div>
        {/* <ForecastSection forecastDays={weather.forecast.forecastday} /> */}
        <WeatherCard forecastDays={weather.forecast.forecastday} />
        
      </div>
    )
  );
}
