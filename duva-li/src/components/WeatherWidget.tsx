import "./WeatherWidget.css";

interface WeatherWidgetProps {
  temp: number;
  wind: number;
  humidity: number;
  forecast: { day: string; max: number; min: number }[];
  condition: string;
  isDay: number;
  name: string;
  region: string;
  country: string;
  icon: string;
  lastUpdated: string;
}

export default function WeatherWidget({
  temp,
  wind,
  humidity,
  forecast,
  condition,
  isDay,
  name,
  region,
  country,
  icon,
  lastUpdated,
}: WeatherWidgetProps) {
  const getConditionClass = (condition: string) => {
    return condition
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };
  return (
    <div
      className={`widget ${isDay ? "day" : "night"} ${getConditionClass(
        condition
      )}`}
    >
      <div>
        {name} {region} {country} {lastUpdated}
      </div>
      <div>{condition}</div>
      <img src={`https:${icon}`} alt="Weather icon" />

      <div className="sky">
        <div className="moon-or-sun" />

        {condition === "Mist" && (
          <div className="mist-animation">
            <div className="mist-layer layer-1"></div>
            <div className="mist-layer layer-2"></div>
            <div className="mist-layer layer-3"></div>
          </div>
        )}

        {(condition === "Partly cloudy" || condition === "Partly Cloudy") && (
          <div className="partly-cloudy-animation">
            <div className="fluffy-cloud cloud-1"></div>
            <div className="fluffy-cloud cloud-2"></div>
            <div className="fluffy-cloud cloud-3"></div>
          </div>
        )}

        {condition === "Fog" && (
          <div className="fog-animation">
            <div className="fog-layer fog-1"></div>
            <div className="fog-layer fog-2"></div>
            <div className="fog-layer fog-3"></div>
            <div className="fog-layer fog-4"></div>
          </div>
        )}

        {condition === "Patchy rain nearby" && (
          <div className="patchy-rain-animation">
            <div className="patchy-cloud cloud-1"></div>
            <div className="patchy-cloud cloud-2"></div>
            <div className="patchy-rain">
              <div className="rain-drop drop-1"></div>
              <div className="rain-drop drop-2"></div>
              <div className="rain-drop drop-3"></div>
              <div className="rain-drop drop-4"></div>
              <div className="rain-drop drop-5"></div>
            </div>
          </div>
        )}

        {condition === "Moderate or heavy rain with thunder" && (
          <div className="heavy-rain-thunder-animation">
            <div className="heavy-thunder-cloud cloud-1"></div>
            <div className="heavy-thunder-cloud cloud-2"></div>
            <div className="heavy-thunder-cloud cloud-3"></div>
            <div className="heavy-rain-drops">
              {[...Array(15)].map((_, i) => (
                <div className="heavy-drop" key={i}></div>
              ))}
            </div>
            <div className="intense-lightning flash-1"></div>
            <div className="intense-lightning flash-2"></div>
            <div className="intense-lightning flash-3"></div>
          </div>
        )}

        {condition === "Light rain" && (
          <div className="light-rain-animation">
            <div className="light-rain-cloud cloud-1"></div>
            <div className="light-rain-cloud cloud-2"></div>
            <div className="light-rain-drops">
              <div className="light-drop drop-1"></div>
              <div className="light-drop drop-2"></div>
              <div className="light-drop drop-3"></div>
              <div className="light-drop drop-4"></div>
              <div className="light-drop drop-5"></div>
              <div className="light-drop drop-6"></div>
            </div>
          </div>
        )}

        {condition === "Sunny" && (
          <div className="sunny-animation">
            <div className="sun-beam beam-1"></div>
            <div className="sun-beam beam-2"></div>
            <div className="sun-beam beam-3"></div>
            <div className="sun-beam beam-4"></div>
            <div className="sun-beam beam-5"></div>
            <div className="sun-beam beam-6"></div>
            <div className="sun-beam beam-7"></div>
            <div className="sun-beam beam-8"></div>
          </div>
        )}

        {condition === "Thundery outbreaks in nearby" && (
          <div className="thundery-animation">
            <div className="storm-cloud thunder-cloud-1"></div>
            <div className="storm-cloud thunder-cloud-2"></div>
            <div className="storm-cloud thunder-cloud-3"></div>
            <div className="lightning-bolt bolt-1"></div>
            <div className="lightning-bolt bolt-2"></div>
            <div className="lightning-bolt bolt-3"></div>
          </div>
        )}

        {condition === "Clear" && (
          <div className="clear-animation">
            {isDay ? (
              <div className="sun-rays">
                <div className="ray ray-1"></div>
                <div className="ray ray-2"></div>
                <div className="ray ray-3"></div>
                <div className="ray ray-4"></div>
                <div className="ray ray-5"></div>
                <div className="ray ray-6"></div>
              </div>
            ) : (
              <div className="stars">
                <div className="star star-1"></div>
                <div className="star star-2"></div>
                <div className="star star-3"></div>
                <div className="star star-4"></div>
                <div className="star star-5"></div>
              </div>
            )}
          </div>
        )}

        {condition === "Patchy light rain with thunder" && (
          <div className="patchy-rain-thunder-animation">
            <div className="patchy-thunder-cloud cloud-1"></div>
            <div className="patchy-thunder-cloud cloud-2"></div>
            <div className="light-rain-drop drop-1"></div>
            <div className="light-rain-drop drop-2"></div>
            <div className="light-rain-drop drop-3"></div>
            <div className="thunder-lightning flash-1"></div>
            <div className="thunder-lightning flash-2"></div>
          </div>
        )}

        {condition === "Overcast" && (
          <div className="overcast-animation">
            <div className="overcast-cloud cloud-1"></div>
            <div className="overcast-cloud cloud-2"></div>
            <div className="overcast-cloud cloud-3"></div>
            <div className="overcast-cloud cloud-4"></div>
          </div>
        )}

        {condition === "cloudy" && (
          <div className="cloudy-animation">
            <div className="cloudy-cloud cloud-1"></div>
            <div className="cloudy-cloud cloud-2"></div>
            <div className="cloudy-cloud cloud-3"></div>
            <div className="cloudy-cloud cloud-4"></div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-main">
          <div className="temperature">{temp}°</div>
          <div className="details">
            <div>
              <i className="fas fa-wind"></i> Wind: {wind} km/h
            </div>
            <div>
              <i className="fas fa-tint"></i> Humidity: {humidity}%
            </div>
          </div>
        </div>

        <div className="forecast">
          {forecast.map((f, i) => (
            <div className="forecast-day" key={i}>
              <span>{f.day} </span>
              <span>
                {f.max}° / {f.min}°
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
