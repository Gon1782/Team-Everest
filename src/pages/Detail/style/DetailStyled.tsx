import { BsJustify } from 'react-icons/bs';
import styled from 'styled-components';

export const DetailContainer = styled.main`
  width: 100vw;
  max-width: 1460px;
  margin: 0 auto;
`;

export const DetailBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const ReviewBtn = styled.button`
  cursor: pointer;
  width: 120px;
  height: 2.5rem;
  border: none;
  border-radius: 30px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.blue};
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.navy};
  }
`;

export const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const LandmarkImg = styled.img`
  width: 615px;
  height: 410px;
  border-radius: 30px;
  object-fit: cover;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 25%;
  gap: 1rem;
  margin: 3rem;
`;

export const DetailTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
`;

export const DetailScore = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  font-size: 1.5rem;
  line-height: 1.5rem;
  gap: 1rem;
`;
export const DetailRatingBox = styled.span`
  display: flex;
  gap: 0.2rem;
  font-size: 20px;
  line-height: 22px;
  color: ${(props) => props.theme.black};
`;
export const SmallTitle = styled.h4`
  display: flex;
  width: 100%;
  gap: 1rem;
  margin: 1rem auto 1rem 0;
  font-size: 1rem;
  font-weight: 600;
`;
export const LocationInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, minmax(2rem, auto));
  width: 100%;
  height: 100%;
  font-size: 1rem;
  line-height: 2rem;
  margin-bottom: 80px;
`;
export const LandMarkInfo = styled.span`
  font-weight: normal;
`;
export const DetailOverview = styled.div`
  width: 1024px;
  min-height: 200px;
  line-height: 1.5rem;
  text-align: center;
  margin: 2rem 0;
`;
export const DetailSubTitle = styled.h2`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 2rem 0;
  margin-top: 80px;
  margin-bottom: 48px;
`;

export const DetailReviewTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
`;
