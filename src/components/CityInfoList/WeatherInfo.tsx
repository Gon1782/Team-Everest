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

interface Props {
  city: any;
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
  const [minTemp, setMinTemp] = useState<number>();
  const [maxTemp, setMaxTemp] = useState<number>();

  // 위치로 날씨 불러오기
  const getCityLocation = () => {
    navigator.geolocation.getCurrentPosition(() => {
      let lat = city?.mapy.toFixed(5);
      let lon = city?.mapx.toFixed(5);
      getWeather(lat, lon);
    });
  };

  // 날씨 api 요청 (기온 단위 변경)
  const getWeather = async (lat: number, lon: number) => {
    let url = `${apiUrl}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    let response = await axios.get(url);
    console.log('response', response);
    setWeatherName(response?.data.weather[0].main);
    setMinTemp(response?.data.main.temp_min);
    setMaxTemp(response?.data.main.temp_max);
  };

  console.log('weatherName', weatherName);

  useEffect(() => {
    getCityLocation();
  }, []);

  return (
    <>
      <Container img={weatherIcon[weatherName]} />
      <div>{weatherKor[weatherName]}</div>
      <div>{minTemp}</div>
      <div>{maxTemp}</div>
    </>
  );
};

export default WeatherInfo;

interface ContainerProps {
  img: string | undefined;
}

const Container = styled.div<ContainerProps>`
  width: 50px;
  height: 50px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  background-image: url(${(props) => props.img});
  /* background-repeat: no-repeat; */
  background-size: 100% 100%;
  background-position: center;
  transition: all 0.2s ease-in;
`;
