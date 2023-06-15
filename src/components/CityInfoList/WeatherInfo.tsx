import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { weartherApi } from '@/common/api/weatherApi';
import Clouds from '@/assets/Weather/cloud.webp';
import Clear from '@/assets/Weather/clear.webp';
import Rain from '@/assets/Weather/rain.webp';
import Drizzle from '@/assets/Weather/drizzle.webp';
import Snow from '@/assets/Weather/snow.webp';
import Thunderstorm from '@/assets/Weather/thunderstorm.webp';
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
  // 기온
  const [temp, setTemp] = useState<number>();

  // 날씨 api 요청 (기온 단위 변경)
  const getWeather = async (lat: string, lon: string) => {
    let url = `${apiUrl}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    let response = await axios.get(url);
    setWeatherName(response?.data.weather[0].main);
    setTemp(response?.data.main.temp);
  };

  // 위치로 날씨 불러오기
  useEffect(() => {
    if (!!city) {
      getWeather(city?.mapy.toFixed(5), city?.mapx.toFixed(5));
    }
  }, [city]);

  return (
    <Container>
      <>
        {weatherName ? (
          <>
            <WeatherIcon src={weatherIcon[weatherName]} alt="weather" />
            <WeatherName>{weatherKor[weatherName]}</WeatherName>
            <WeatherTemp>{temp}&#8451;</WeatherTemp>
          </>
        ) : (
          <span>-</span>
        )}
      </>
    </Container>
  );
};

export default WeatherInfo;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.grey};
  width: 155px;
  height: 32px;
  border-radius: 100px;
  padding-left: 8px;
  padding-right: 8px;
`;

const WeatherIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 6px;
`;

const WeatherName = styled.p`
  margin-right: 8px;
  font-weight: 500;
`;

const WeatherTemp = styled.p`
  font-size: 0.875rem;
`;
