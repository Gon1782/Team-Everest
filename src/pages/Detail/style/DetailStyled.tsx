import styled from 'styled-components';

export const DetailContainer = styled.main`
  width: 100vw;
  max-width: 768px;
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

export const ImageSkeleton = styled.img`
  width: 100%;
  height: 25%;
  object-fit: cover;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 25%;
  border: 1px solid black;
  gap: 1rem;
`;

export const DetailTitle = styled.h1`
  font-size: 3rem;
`;

export const DetailScore = styled.div`
  font-size: 2rem;
`;

export const DetailInfoBox = styled.div`
  font-size: 2rem;
  padding: 2rem 5rem;
`;

export const SmallTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  font-size: 1rem;
  gap: 1rem;
  line-height: 2rem;
`;
