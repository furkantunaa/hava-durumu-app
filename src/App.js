import React, { useState, useEffect } from "react";
import "./App.css";
import { usePosition } from "use-position";
import axios from "axios";
function App() {
  const [weather, setWeather] = useState();
  const { latitude, longitude } = usePosition();
  const key = process.env.REACT_APP_WEATHER_DATA;
  const [loading, setLoading] = useState(false);

  const getWeatherData = async (lat, lon) => {
    const lang = navigator.language.split("_")[0];
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}`
      );
      console.log(data);
      setWeather(data);
      setLoading(false);
    } catch {
      setLoading(false);
      console.error("veriler çekilemedi.");
    }
  };

  useEffect(() => {
    latitude && longitude && getWeatherData(latitude, longitude);
  }, [latitude, longitude]);

  if (loading) return <div>Loading</div>;

  return (
    <div className="app">
      <h2>Hava Durumu</h2>
      <h3>Enlem Kordinat:{latitude}</h3>
      <h3>Boylam Kordinat:{longitude}</h3>
      <h3>Kordinat Bölgesi:{weather?.name}</h3>
      <h3>Hava Sıcaklığı:{Math.ceil(weather?.main.temp - 273.15)}</h3>
      <h3>Durumu;{weather?.weather.map((data) => data.main)}</h3>
      <h3>Özelliği:{weather?.weather.map((data) => data.description)}</h3>
    </div>
  );
}
export default App;
