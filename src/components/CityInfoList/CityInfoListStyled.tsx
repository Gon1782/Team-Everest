import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  /* display: flex;
  justify-content: center;
  flex-direction: column; */
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const ContentWrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 1000px;
  /* height: 1000px; */
  gap: 30px;
`;

export const ContentItemWrap = styled.div`
  width: 1000px;
  height: 200px;
  display: flex;
  gap: 30px;
  /* background-color: green; */
  /* border-radius: 20px; */
`;

export const Image = styled.img`
  width: 300px;
  height: inherit;
  /* border-bottom-left-radius: 20px;
  border-top-left-radius: 20px; */
  border-radius: 20px;
`;

export const InfoWrap = styled.div`
  width: 400px;
  padding: 30px 20px;
  border-radius: 20px;
  border: 1px solid lightgrey;
`;

export const TourName = styled.h1`
  font-size: 24px;
`;

export const TourAddr = styled.p``;
