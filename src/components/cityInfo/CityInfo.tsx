import React from 'react';
import styled from 'styled-components';
import { City } from '@/types/CityType';
import WeatherInfo from '../CityInfoList/WeatherInfo';

interface Props {
  city: City;
}

const CityInfo = ({ city }: Props) => {
  return (
    <Container>
      <CitylImg src={city.image} alt="city" />
      {/* 우측 도시 정보 */}
      <CityInfoWrapper>
        <div>
          <WeatherInfo city={city} />
          <div>{city.engarea}</div>
          <div>{city.name}</div>
        </div>
        <div>{city.hashtag}</div>
        <div>{city.description}</div>
      </CityInfoWrapper>
    </Container>
  );
};

export default CityInfo;

const Container = styled.div`
  margin: 0 auto;
  width: 85%;
  height: 450px;
  background-color: ${(props) => props.theme.white};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 35px;
  gap: 30px;
`;

const CitylImg = styled.img`
  width: 50%;
  height: 85%;
`;

// 우측 도시 정보
const CityInfoWrapper = styled.div`
  width: 50%;
  height: 85%;
  background-color: skyblue;
`;
