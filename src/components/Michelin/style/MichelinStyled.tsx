import styled from 'styled-components';

export const MichelinSection = styled.section`
  max-width: 1230px;
  width: 100%;
  margin: 0 auto 80px;
`;

export const Introduce = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 64px;
  /* font-size: 50px; */
  font-weight: 700;
`;
export const MichelinTitle = styled.h4`
  display: flex;
  justify-content: center;
  width: 100%;
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
  border-radius: 15px;
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
  padding: 15px;
  margin: 0 auto;
  gap: 1rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 13px 14px 25px -17px rgba(0, 0, 0, 0.28);
`;
export const MichelinPlace = styled.div`
  display: flex;
  gap: 0.5rem;
`;
export const MichelinLocation = styled.p`
  color: ${(props) => props.theme.blue};
  font-size: 15px;
`;
export const MichelinAddr = styled.p`
  color: ${(props) => props.theme.darkgrey};
  word-break: 'keep-all';
  font-size: 15px;
`;
export const MichelinInfoTitle = styled.h5`
  font-weight: 600;
`;
export const MichelinCategory = styled.h6`
  color: ${(props) => props.theme.darkgrey};
  font-size: 1rem;
  font-weight: 300;
`;
export const MichelinRatingDiv = styled.div`
  display: flex;
  gap: 0.4rem;
`;
export const MichelinRating = styled.p`
  border-top: 1px solid black;
`;
export const MichelinInfoContainer = styled.div`
  display: flex;
  gap: 3rem;
`;
