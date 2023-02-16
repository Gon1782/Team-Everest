import styled from 'styled-components';

export const DetailContainer = styled.main`
  width: 100vw;
  max-width: 1460px;
  margin: 1rem auto 0;
`;

export const WriteReview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 3rem;
  border: 1px solid black;
`;
export const ReviewBtn = styled.button`
  cursor: pointer;
  width: 10rem;
  height: 5rem;
  border: none;
`;

export const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const LandmarkImg = styled.img`
  width: 615px;
  height: 410px;
  border-radius: 30px;
  object-fit: cover;
`;

export const InfoBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 25%;
  gap: 1rem;
  margin: 3rem;
`;

export const DetailTitle = styled.h1`
  font-size: 3rem;
`;

export const DetailScore = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  font-size: 1.5rem;
  gap: 1rem;
`;

export const SmallTitle = styled.h4`
  display: flex;
  width: 40%;
  gap: 1rem;
  margin: 1rem auto 1rem 0;
  font-size: 1rem;
  font-weight: bold;
`;

export const LocationInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 1rem;
  font-size: 1rem;
  line-height: 2rem;
`;

export const LandMarkInfo = styled.span`
  font-weight: normal;
`;
