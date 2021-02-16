import React, { useEffect } from 'react';
import { toQueryString } from '../utils';
import {useState} from 'react'

function Weather(){
  const [weather, setWeather] = useState(null)
  

  
  useEffect(() => {
    const pollWeather = (location) => {
      let url = 'http://api.openweathermap.org/data/2.5/weather?';
      
      /* Remember that it's unsafe to expose your API key! In production,
      you would definitely save your key in an environment variable.
      To keep API keys simple during the development of your project,
      you can set an `apiKey` variable in this file for now. */
      const apiKey = process.env.REACT_APP_WEATHER_API
      
      const params = {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        appid: apiKey
      };
      
      url += toQueryString(params);
      
      fetch(url)
      .then((res) => res.json())
      .then((weather) => setWeather(weather));
    }
    
    navigator.geolocation.getCurrentPosition(pollWeather)
   
  }, [])

  
    let content = <div className='loading'>loading weather...</div>;
    if (weather) {
      const temp = (weather.main.temp - 273.15) * 1.8 + 32;
      content = <div>
        <p>{weather.name}</p>
        <p>{temp.toFixed(1)} degrees</p>
      </div>;
    }

  

  return (
    <section>
      <h1>Weather</h1>
      <div className='weather'>
        {content}
      </div>
    </section>
  );
}



export default Weather;
