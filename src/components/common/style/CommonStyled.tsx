import styled from 'styled-components';

export const CitySection = styled.section`
  max-width: 1490px;
  width: 100%;
  margin: auto;
`;
export const CityTitle = styled.h1`
  font-size: 2rem;
  margin: 2rem 0;
`;
export const InfoBox = styled.div`
  cursor: pointer;
  width: 260px;
  height: 380px;
`;
export const Image = styled.img`
  width: 260px;
  height: 260px;
  background-color: lightgray;
  border-radius: 30px;
  object-fit: cover;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
  gap: 1rem;
`;
export const Place = styled.div`
  display: flex;
  gap: 0.5rem;
`;
export const Rating = styled.span`
  border-top: 1px solid black;
`;
