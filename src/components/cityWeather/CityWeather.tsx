import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { weartherApi } from '@/common/api/weatherApi';

const Weathertest = () => {
  const API_KEY = `${weartherApi.api_key}`;
  const apiUrl = `${weartherApi.url}`;
  const [weather, setWeather] = useState<any>(null);

  const getCityLocation = () => {
    navigator.geolocation.getCurrentPosition(() => {
      let lat = 37.56614;
      let lon = 127.01575;
      getWeather(lat, lon);
    });
  };

  const getWeather = async (lat: number, lon: number) => {
    let url = `${apiUrl}lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    let response = await axios.get(url);
    setWeather(response?.data.weather[0].main);
  };

  useEffect(() => {
    getCityLocation();
  }, []);

  return <div>{weather}</div>;
};

export default Weathertest;
