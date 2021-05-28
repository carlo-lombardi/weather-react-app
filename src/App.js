import { useState, useEffect } from "react";
import "./index.css";

const api = {
  KEY: "79a92995a04e007e0709283644b94086",
  LINK: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const search = async (e) => {
    try {
      if (e.key === "Enter") {
        const response = await fetch(
          `${api.LINK}weather?q=${query}&units=metric&APPID=${api.KEY}`
        );
        const data = await response.json();
        setWeather(data);
        setQuery("");
        console.log(data);
        console.log(weather);
      }
    } catch (error) {}
  };
  return (
    <>
      <div
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 18
              ? "app warm"
              : "app cold"
            : "app"
        }
      >
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="weather">
                  Feels like {weather.main.feels_like}
                </div>
                <div className="weather">Wind {weather.wind.speed}</div>
                <div className="weather">{weather.weather[0].description}</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
      </div>
    </>
  );
}

export default App;
