import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { weartherApi } from '@/common/api/weatherApi';
import Clouds from '@/assets/Weather/cloud.png';
import Clear from '@/assets/Weather/clear.png';
import Rain from '@/assets/Weather/rain.png';
import Drizzle from '@/assets/Weather/drizzle.png';
import Snow from '@/assets/Weather/snow.png';
import Thunderstorm from '@/assets/Weather/thunderstorm.png';
import styled from 'styled-components';
import { City } from '@/types/CityType';

interface Props {
  city: City;
}

// 날씨 아이콘
const weatherIcon: { [key: string]: string } = {
  Clouds: Clouds,
  Clear: Clear,
  Rain: Rain,
  Mist: Drizzle,
  Snow: Snow,
  Thunderstorm: Thunderstorm,
};

// 날씨 이름 한글로 변경
const weatherKor: { [key: string]: string } = {
  Clouds: '구름',
  Clear: '맑음',
  Rain: '비',
  Mist: '안개',
  Snow: '눈',
  Thunderstorm: '천둥번개',
};

const WeatherInfo = ({ city }: Props) => {
  const API_KEY = `${weartherApi.api_key}`;
  const apiUrl = `${weartherApi.url}`;
  // 날씨이름
  const [weatherName, setWeatherName] = useState('');
  // 최저, 최고 기온
  const [temp, setTemp] = useState<number>();

  // 위치로 날씨 불러오기
  const getCityLocation = () => {
    navigator.geolocation.getCurrentPosition(() => {
      let lat = city?.mapy.toFixed(5);
      let lon = city?.mapx.toFixed(5);
      getWeather(lat, lon);
    });
  };

  // 날씨 api 요청 (기온 단위 변경)
  const getWeather = async (lat: string, lon: string) => {
    let url = `${apiUrl}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    let response = await axios.get(url);
    console.log('response', response);
    setWeatherName(response?.data.weather[0].main);
    setTemp(response?.data.main.temp);
  };

  useEffect(() => {
    if (!!city) {
      getWeather(city?.mapy.toFixed(5), city?.mapx.toFixed(5));
    }
  }, [city]);

  return (
    <Container>
      <WeatherIcon src={weatherIcon[weatherName]} />
      <WeatherName>{weatherKor[weatherName]}</WeatherName>
      <div>{temp}&#8451;</div>
    </Container>
  );
};

export default WeatherInfo;

const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 40px;
`;

const WeatherIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 6px;
`;

const WeatherName = styled.p`
  margin-right: 8px;
`;
