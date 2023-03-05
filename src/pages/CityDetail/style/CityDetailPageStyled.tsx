import styled from 'styled-components';

export const Wrap = styled.section`
  width: 100%;
  height: 100%;
  /* padding-top: 50px; */
`;

export const CityDetailImg = styled.img`
  display: block;
  width: 100%;
  height: 450px;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5)
  );
  object-fit: cover;
`;

// 날씨 관련 스타일
export const WeatherWrap = styled.section`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const Introduce = styled.section`
  display: flex;
  justify-content: center;
  margin: 80px 0 64px;
  font-size: 50px;
  font-weight: 700;
`;
