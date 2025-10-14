import "./HourlyForecast.css";

interface HourlyForecastProps {
    forecastDay: any;
    formatHour: (hourString: string) => string;
    formatDate: (dateString: string) => string;
}

export default function HourlyForecast({ forecastDay, formatHour, formatDate }: HourlyForecastProps) {
    if (!forecastDay || !forecastDay.hour) return null;

    return (
       <div className="hourly-forecast-row">
      <h5 className="hourly-title">
        Hourly Forecast (every 3 hours) for {formatDate(forecastDay.date)}
      </h5>

      <div className="hourly-forecast-list">
        {forecastDay.hour
          .filter((_: any, hIdx: number) => hIdx % 3 === 0)
          .map((hour: any, hIdx: number) => (
            <div className="hourly-forecast-item" key={hIdx}>
              <div className="hourly-time">{formatHour(hour.time)}</div>
              <img
                src={hour.condition.icon}
                alt={hour.condition.text}
                className="hourly-icon"
              />
              <div className="hourly-temp">{hour.temp_c}°C</div>
              <div className="hourly-condition">{hour.condition.text}</div>
              <div className="hourly-extra">
                💧 {hour.humidity}% &nbsp; | &nbsp; 💨 {hour.wind_kph} km/h
              </div>
            </div>
          ))}
      </div>
    </div>
    );
}
