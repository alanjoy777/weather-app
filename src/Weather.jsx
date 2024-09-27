import axios from 'axios';
import React, { useState } from 'react';

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = 'f5dc97cc18fe3ec553b924f10ca0e1ea'; // Your actual API key

  const getWeather = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Weather App</h1>
      <form onSubmit={getWeather} style={styles.form}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Get Weather</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {weatherData && (
        <div style={styles.weatherInfo}>
          <h2>{weatherData.name}</h2>
          <p style={styles.temp}>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f8ff',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '2px solid #ccc',
    width: '250px',
    marginRight: '10px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '1rem',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '20px',
  },
  weatherInfo: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    display: 'inline-block',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  temp: {
    fontSize: '1.5rem',
    color: '#007bff',
  }
};

export default Weather;
