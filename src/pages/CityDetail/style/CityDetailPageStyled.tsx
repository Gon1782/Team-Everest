import styled from 'styled-components';

export const Wrap = styled.section`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-top: 50px;
  background-color: ${(props) => props.theme.grey};
`;

export const CityDetailImg = styled.img`
  display: block;
  width: 100%;
  height: 450px;
  object-fit: contain;
`;

// 날씨 관련 스타일
export const WeatherWrap = styled.section`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;
