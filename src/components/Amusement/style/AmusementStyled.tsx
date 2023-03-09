import styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';

export const AmusementInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 800px;
  background-color: #bcd7e9;
`;
export const AmusementInfoHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 48px;
`;
export const AmusementInfoSubHeader = styled.h4`
  color: ${(props) => props.theme.navy};
`;
export const AmusementInfoTitle = styled.h2`
  margin-top: 25px;
  line-height: 55px;
  text-align: center;
`;
export const AmusementInfoBox = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;
export const AmusementImg = styled.img`
  width: 100%;
  max-height: 213px;
  border-radius: 20px 20px 0 0;
  object-fit: cover;
`;
export const AmusementInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 160px;
  padding-left: 10px;
  padding-right: 10px;
  gap: 1rem;
  background-color: white;
  border-radius: 20px;
`;
export const AmusementTitle = styled.h5`
  word-break: keep-all;
  font-weight: 600;
`;
export const AmuseCategory = styled.h6`
  color: ${(props) => props.theme.darkgrey};
  font-size: 1rem;
  font-weight: 300;
`;
export const AmuseRating = styled.div`
  display: flex;
  gap: 0.5rem;
  & svg {
    color: #0039cb;
    font-size: 24px;
  }
`;
export const AmusePlace = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const AmuseLocation = styled.span`
  color: ${(props) => props.theme.blue};
  font-size: 14px;
`;
export const AmuseAddr = styled.span`
  color: ${(props) => props.theme.darkgrey};
  word-break: keep-all;
  font-size: 14px;
`;
export const SwiperSlideStyle = styled(SwiperSlide)`
  width: 320px;
  height: 380px;
  border-radius: 20px;
  opacity: 0.6;
  box-shadow: 13px 14px 25px -17px rgba(0, 0, 0, 0.28);
  &.swiper-slide-prev {
    opacity: 0.9;
  }
  &.swiper-slide-active {
    opacity: 1;
  }
  &.swiper-slide-next {
    opacity: 0.9;
  }
`;
