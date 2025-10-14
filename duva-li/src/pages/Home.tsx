import { useEffect, useState } from "react";
import "./Home.css";
import WeatherWidget from "../widgets/WeatherWidget";


interface HomeProps {
  weather: any;
  error: string | null;
}

export default function Home({ weather, error }: HomeProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  // const [backgroundImage, setBackgroundImage] = useState<string>("");


  useEffect(() => {
    if (!weather?.current) return;

    const isDay = weather.current.is_day === 1;
    const imageUrl = isDay
      ? "https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?cs=srgb&dl=pexels-hikaique-125510.jpg&fm=jpg"
      : "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?cs=srgb&dl=pexels-johannes-plenio-3225517.jpg&fm=jpg";

      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";  
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";
    
      return () => {
        document.body.style.backgroundImage = "";
      }
  }, [weather]);

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


  return (weather && weather.forecast && (
    <WeatherWidget
      temp={weather.current.temp_c}
      wind={weather.current.wind_kph}
      humidity={weather.current.humidity}
      forecast={weather.forecast.forecastday.slice(1, 3).map((day: any) => ({
        day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
        max: Math.round(day.day.maxtemp_c),
        min: Math.round(day.day.mintemp_c),
      }))}
      condition={weather.current.condition.text}
      isDay={weather.current.is_day}
      name={weather.location.name}
      region={weather.location.region}
      country={weather.location.country}
      icon={weather.current.condition.icon}
      lastUpdated={weather.current.last_updated }
    />
    
  ))};
