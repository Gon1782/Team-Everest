import styled from 'styled-components';

export const MichelinSection = styled.section`
  max-width: 1230px;
  width: 100%;
  margin: 0 auto 80px;
`;
export const MichelinTitle = styled.h2`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 2rem;
  margin: 0 0 3rem;
`;
export const MichelinInfoBox = styled.div`
  cursor: pointer;
  width: 302px;
  height: 380px;
`;
export const MichelinImage = styled.img`
  position: absolute;
  width: 302px;
  height: 226px;
  background-color: lightgray;
  border-radius: 30px;
  object-fit: cover;
`;
export const MichelinInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 302px;
  height: 90%;
  gap: 1rem;
`;
export const MichelinInfos = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 171px;
  padding: 1rem;
  margin: 0 auto;
  gap: 1rem;
  background-color: white;
  border-radius: 30px;
`;
export const MichelinPlace = styled.div`
  display: flex;
  gap: 0.5rem;
`;
export const MichelinLocation = styled.span`
  color: #0034b9;
  font-size: 14px;
`;
export const MichelinAddr = styled.span`
  color: '#5A5A5A';
  word-break: 'keep-all';
  font-size: 14px;
`;
export const MichelinInfoTitle = styled.span`
  font-size: 25px;
`;
export const MichelinCategory = styled.span`
  color: #535353;
  font-size: 18px;
`;
export const MichelinRatingDiv = styled.div`
  display: flex;
  gap: 1rem;
`;
export const MichelinRating = styled.span`
  border-top: 1px solid black;
`;
export const MichelinInfoContainer = styled.div`
  display: flex;
  gap: 3rem;
`;
